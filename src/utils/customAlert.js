import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const customImgAlert = (title, img) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    iconHtml: `<div class="flex flex-wrap justify-center italic"><h1 class='text-2xl'>${title}</h1>
        <img class=' w-28 my-6 mx-1' src=${img}></div>`,
    customClass: {
      icon: 'custom-icon',
    },
    width: '300px',
    background: 'rgba(255,255,255,.9)',
    showConfirmButton: false,
    padding: '2rem',
  });
};

export const errorAlert = (text, img) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    iconHtml: `
    <div class="flex flex-col flex-wrap justify-center italic pt-2">
        <div class='flex justify-center'>
          <img class='w-24 my-1 mx-1' src=${img} />
        </div>
        <h1 class='text-3xl text-center my-2'>Oops..</h1>
        <p class='text-base text-slate-500 text-center my-2 whitespace-pre'>${text}</p>
    </div>
        `,
    customClass: {
      icon: 'error-icon',
      confirmButton: 'error-confirm-button',
      actions: 'error-actions',
    },
    width: '300px',
    background: 'rgba(255,255,255,.9)',
    showConfirmButton: true,
    padding: '2rem',
    confirmButtonColor: '#4794b9',
  });
};

export const limitAlert = (text, img) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    iconHtml: `
      <div class="flex flex-col flex-wrap justify-center italic pt-2">
          <div class='flex justify-center'>
            <img class='w-24 my-1 mx-1' src=${img} />
          </div>
          <h1 class='text-3xl text-center my-2'>Oops..</h1>
          <p class='text-base text-slate-500 text-center my-2 whitespace-pre tracking-wider'>${text}</p>
      </div>
          `,
    customClass: {
      icon: 'limit-icon',
      confirmButton: 'limit-confirm-button',
      actions: 'limit-actions',
    },
    width: '300px',
    background: 'rgba(255,255,255,.9)',
    showConfirmButton: true,
    padding: '2rem',
    confirmButtonColor: '#4794b9',
  });
};

export const saveAlert = (text, img) => {
  const MySwal = withReactContent(Swal);
  return MySwal.fire({
    iconHtml: `
      <div class="flex flex-col flex-wrap justify-center italic pt-2">
          <div class='flex justify-center'>
            <img class='w-24 my-2 mx-1' src=${img} />
          </div>
          <h1 class='text-3xl text-center my-2'>????????????</h1>
          <p class='text-base text-slate-500 text-center  my-2 whitespace-pre tracking-wider'>${text}</p>
      </div>
          `,
    customClass: {
      title: 'save-title',
      icon: 'save-icon',
      confirmButton: 'save-button',
      cancelButton: 'save-button',
      actions: 'save-actions',
    },
    width: '320px',
    background: 'rgba(255,255,255,.9)',
    showCancelButton: true,
    showConfirmButton: true,
    padding: '2rem',
    confirmButtonColor: '#57bdc8',
    cancelButtonColor: '#4794b9',
    confirmButtonText: '?????????',
    cancelButtonText: '????????????',
  });
};

export const redirectAlert = (text, img) => {
  const MySwal = withReactContent(Swal);
  return MySwal.fire({
    iconHtml: `
      <div class="flex flex-col flex-wrap justify-center italic pt-2">
          <div class='flex justify-center'>
            <img class='w-24 my-1 mx-1' src=${img} />
          </div>
          <h1 class='text-3xl text-center my-2'>Oops..</h1>
          <p class='text-base text-slate-500 text-center my-2'>${text}</p>
      </div>
          `,
    customClass: {
      icon: 'error-icon',
      confirmButton: 'error-confirm-button',
      actions: 'error-actions',
    },
    width: '300px',
    background: 'rgba(255,255,255,.9)',
    showConfirmButton: true,
    padding: '2rem',
    confirmButtonColor: '#4794b9',
  });
};
