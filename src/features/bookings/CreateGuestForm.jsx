import { useRef } from 'react';

function CreateGuestForm() {
  // RENDER COUNT
  const renderCount = useRef(0);
  // Increment the render count on each render
  renderCount.current += 1;
  console.log('Render count GUEST FORM:', renderCount.current);

  return (
    <>
      
    </>
  );
}

export default CreateGuestForm;
