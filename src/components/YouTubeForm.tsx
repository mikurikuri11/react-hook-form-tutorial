import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
  type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
      twitter: string;
      facebook: string;
    };
    phoneNumbers: string[];
    phNumbers: {
      number: string;
    }[];
  };

  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "Codevolution",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: [],
      phNumbers: [{ number: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
  });

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
                  !value.endsWith("baddomain.com") || "Email is blacklisted"
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

        <label htmlFor="channel" className="mb-2">
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter")}
          className="border p-2 mb-4"
        />

        <label htmlFor="channel" className="mb-2">
          Facebook
        </label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook")}
          className="border p-2 mb-4"
        />

        <label htmlFor="primary-phone" className="mb-2">
          Primary phone number
        </label>
        <input
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0")}
          className="border p-2 mb-4"
        />

        <label htmlFor="secondary-phone" className="mb-2">
          Secondary phone number
        </label>
        <input
          type="text"
          id="sedondary-phone"
          {...register("phoneNumbers.1")}
          className="border p-2 mb-4"
        />

        <div>
          <label>List of phone numbers</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`phNumbers.${index}.number` as const)}
                defaultValue={field.number}
                className="border p-2 mb-4"
              />
              {
                index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    >
                    Remove
                  </button>
                )
              }
            </div>
          ))}
          <button type="button" onClick={() => append({ number: "" })}>Add phone number</button>
        </div>

        <button className="bg-blue-500 text-white py-3 mt-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
