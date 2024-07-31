import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit, formState: {errors}} = useForm();

  //recibo los datos del formulario a travez de data
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-4xl uppercase bg-gray-900">Welcome to your Pokedex!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
          id="email"
          required
        />
        {errors.email?.type === 'pattern' && <p>Please enter a correct email format</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            minLength: 6,
          })}
          id="password"
          required
        />
         {errors.password?.type === 'minLength' && <p>Please enter at least 6 characters</p>}
        <input type="submit" value="send"></input>
      </form>
    </div>
  );
};

export default Form;