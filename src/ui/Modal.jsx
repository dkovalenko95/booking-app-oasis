import { cloneElement, useContext } from 'react';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled, { css } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  // For Create Booking form scroll
  ${(props) =>
    props.$type !== 'bookForm' &&
    css`
      height: 80%;
      overflow-y: auto;
    `
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// Compound Component Pattern
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      { children }
    </ModalContext.Provider>
  );
};

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return (
    // { children }
    cloneElement(children, { onClick: () => open(opensWindowName) }) // cloneElement() used for internal access to event handler(here need to add 'onClick={open(name)}' for elem sets as 'children') -> in this case <Button /> from AddCabin.jsx -> check docs for more info
  );
};

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  
  // Add global event listener for the click(primitive DOM manipulation)
  const { ref } = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close()}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: () => close() })}
        </div>
      </StyledModal>
    </Overlay>,

    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;



// NOTE: Simple tempalte for Modal before compound
// function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>
//           { children }
//         </div>
//       </StyledModal>
//     </Overlay>,

//     document.body
//   );
// }


// NOTE: EXTRACTED TO HOOK - outside click for modal closing
// useEffect(() => {
//   const clickHandler = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       close();
//     };
//   };
//   document.addEventListener('click', clickHandler, true);
//   // Cleanup
//   return () => document.removeEventListener('click', clickHandler, true);
// }, [close]);


// NOTE: cloneElement() alternatives
// 1) Render Props Pattern
// <Modal.Open
//   opens='cabin-form'
//   render={(open) => <Button onClick={open}>Add new Cabin</Button>}
// >
//   <Button>Add new cabin</Button>
// </Modal.Open>

// function Open({ render, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);
//   return render(() => open(opensWindowName));
// };

// 2) createElement()
// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);
//   return createElement(children.type, {
//     ...children.props,
//     onClick: () => open(opensWindowName),
//   });
// }


// NOTE: Event bubbling/capturing - related to outside click -> useOutsideClick()
// Whenever to click on 'Add Cabin' btn -> Modal will be attached to the DOM(as a direct child of the 'body'). 
// Click on btn -> 'click' event will bubble up all the way through the DOM until it reaches that Modal -> so then 'click' is basically detected outside the Modal, which will immediately close that Modal again(so logic is working). 
// So basically, when btn clicked -> Modal gets opened for a millisecond, but then it immediately detects 'click' outside of it(because of bubbling), and then it will immediately close again.
// The way to fix this is to not listen for these events on the 'bubbling phase', but on the 'capturing phase', so basically, as the event moves down(capturing) the DOM tree and not up(bubbling) the DOM tree -> to change this default behavior need to pass in a 3rd argument as 'true' to 'addEventListener'.
// If use 'true' here, the event will be handled in the 'capturing phase', so as the event moves down the tree. 
