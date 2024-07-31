import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit, formState: {errors}} = useForm();

  //recibo los datos del formulario a travez de data
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Email</label>
        <div className="mt-2">
        <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
          id="email"
          required
        />
        {errors.email?.type === 'pattern' && <p>Please enter a correct email format</p>}
        </div>

        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">Password</label>
        <div className="mt-2">
        <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="password"
          placeholder="********"
          {...register("password", {
            minLength: 6,
          })}
          id="password"
          required
        />
         {errors.password?.type === 'minLength' && <p>Please enter at least 6 characters</p>}
         <div>
        <input type="submit" value="Log In" className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"></input>
         </div>
        </div>
      </form>
      </div>
      </div>
  );
};

export default Form;
