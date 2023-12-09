import { cloneElement, useContext } from 'react';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
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
    cloneElement(children, { onClick: () => open(opensWindowName) }) // used for internal access to event handler -> check docs
  );
};

function Window({ children, name  }) {
  const { openName, close } = useContext(ModalContext);
  
  // Add global event listeners for the click event (primitive DOM manipulation)
  const { ref } = useOutsideClick(close);
  
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close()}>
          <HiXMark />
        </Button>
        <div>
          {/* { children } */}
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

// EXTRACTED TO HOOK - outside click for modal closing
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

// NOTE: Event bubbling
// All right, now, there's just one problem with this, because watch what happens as I click here again. So that's very strange, right? So we get click outside, but the window doesn't show up, so what strange thing is happening here? Well, the reason for this is actually the way that events work in JavaScript, and in particular, the fact that events bubble up. So whenever I click here on this button, the modal window will be attached to the DOM, right? And it will be attached right here as a direct child of the body, and so if I click on the button, that event will bubble up all the way through the DOM until it also reaches that modal window, and so then the click is basically detected outside the modal window, which will immediately close that window again, so our logic is actually working just fine. So again, when we click here, the modal window basically gets opened for a millisecond, but then it immediately detects a click outside of it, and so then it will immediately close again, and so the way that we fix this is to not listen for these events on the bubbling phase, but on the capturing phase, so basically, as the event moves down the DOM tree and not up the DOM tree, and if all of this sounds a bit strange, then this is just the way that events work in JavaScript, and I have a whole lecture about this in the section on how React works behind the scenes, so please go back there if this is strange to you, but in any case, we can change this default behavior by here, passing in a third argument, which is simply to set this to true. And so if we use true here, then again, the event will actually be handled in the capturing phase, so as the event moves down the tree. So then here the same thing, let's just reload here, let's click, and nice. So that solves our problem, and so that's the reason why I told you earlier that even though we left vanilla JavaScript behind, it's still very important to understand how many things work, because without that knowledge, you probably wouldn't have been able to solve this issue, and so that fundamental knowledge is still extremely important. So let's just test if the click outside still works, and it does, great. So this is how any modern modal window is supposed to work. And now, just to finish, let's actually extract all of this here into a custom hook, which is a great exercise, not only to practice your React skills, but also to create a very nice and reusable custom hook for you. So if you want, you can pause the video here and do this extraction yourself, and then I will come back here once you are finished with that. All right, so hopefully, you tried this, but in any case, let's create that new file right here in the reusable Hooks folder, and let's call it useOutsideClick.js, and then a function called useOutsideClick. Let's also export this, and then what we need to do is to basically just grab all the code here. So I will just copy it for now, paste that here, and then of course, we need to get everything in here. So what do we need inside this custom hook from the outside? Well, it's actually already marked in red, which is basically this handler function right here. So when we use this custom hook now in our component, we will need to pass in that function, and so let's actually delete this now and call useOutsideClick. And so again, here, we now need to pass in that handler, and so that handler is going to be that close function. And so here, let's receive that, and then of course, here, we just call it handler, 'cause this should become really generic. Then here, also, we need to use handler, and maybe to make this even a bit more flexible, let us here allow the user to specify whether they want to listen for the event in the bubbling or in the capturing phase. So let's call this one listenCapturing, and by default, let's set it to true, so then here, we will replace those with listenCapturing. Then we need that here like this, and now, let's see the problem that we have here, and yeah, the only thing that we are missing here is this ref, and so that means that this function here should probably return that ref. So let's store that here, and then all we need to do is to export that, so to return that actually from here, and with this, the same functionality should now be encapsulated here in this abstraction, so in that own custom hook right there. So let's see, and beautiful. Maybe just to finish, let's get rid of that console.log, and there we go, nice. And now, next up, let's also reuse this modal here for some other things. So this form right here, or actually, not this, but here, the edit form is still being rendered down here, and so let's also place that inside a modal window in the next lecture.
