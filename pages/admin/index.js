import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LOGO_LINKEDIN_1 as rawDevLogo } from "helpers/exportImages";
import Image from "next/image";
import { Container } from "components/Container";
import { Card } from "components/Card";
import { Form } from "components/Form";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const fields = [
    {
      field: "Email address",
      setField: setEmail,
    },
    {
      field: "Password",
      setField: setPassword,
    },
  ];

  return (
    <Container className="absolute top-0 left-0 h-full w-full flex justify-center ">
      <Container className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <Container className="mx-auto w-full max-w-sm lg:w-96">
          <Container.Flex className="items-center gap-x-7">
            <Container.Link
              href={"/"}
              Component={Image}
              componentProps={{
                src: rawDevLogo,
                alt: "my-logo",
              }}
              className={{
                component: "h-[3rem] w-auto rounded-full",
              }}
            />
            <Card.Title className="text-3xl font-bold leading-9 tracking-tight text-light">
              Sign in to your account
            </Card.Title>
          </Container.Flex>

          <div className="mt-5">
            <div>
              <Form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn("credentials", {
                    email: email,
                    password: password,
                    rememberMe: rememberMe,
                    redirect: true,
                    callbackUrl: "/admin/dashboard",
                  });
                }}
              >
                {fields.map(({ field, setField }) => (
                  <Form.Field
                    key={field}
                    field={field}
                    onChange={(e) => {
                      setField(e.target.value);
                    }}
                  />
                ))}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-30"
                      onClick={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-3 block text-sm leading-6 text-zinc-500 dark:text-orange-tertiary"
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <Link
                      href="#"
                      className="dark:font-semibold cursor-pointer text-zinc-500 hover:text-zinc-400 dark:text-orange-tertiary dark:hover:text-orange-quaternary"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md text-zinc-800 dark:text-orange-primary bg-orange-secondary dark:bg-orange-tertiary hover:bg-orange-quaternary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-secondary"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Admin;
