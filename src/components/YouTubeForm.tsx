import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();
      return data;
    }
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  type FormValues = {
    username: string;
    email: string;
    channel: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-gray-200 p-6 rounded-md"
      >
        <label htmlFor="username" className="mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border p-2 mb-4"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <p className="text-rose-600 mb-3">{errors.username?.message}</p>

        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
            validate: {
              notAdmin: (value) => {
                return (
                  value !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlacklisted: (value) => {
                return (
                  !value.endsWith("baddomain.com") ||
                  "Email is blacklisted"
                );
              },
            },
          })}
          className="border p-2 mb-4"
        />
        <p className="text-rose-600 mb-3">{errors.email?.message}</p>

        <label htmlFor="channel" className="mb-2">
          Channel
        </label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: "Channel is required",
          })}
          className="border p-2 mb-4"
        />
        <p className="text-rose-600 mb-3">{errors.channel?.message}</p>

        <button className="bg-blue-500 text-white py-3 mt-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
