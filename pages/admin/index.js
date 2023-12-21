import { useState } from "react";
import { signIn } from "next-auth/react";
import { LOGO_LINKEDIN_1 as rawDevLogo } from "helpers/exportImages";
import Image from "next/image";
import { Container } from "components/Container";
import { Post } from "components/Post";
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
            <Post.Title className="text-3xl font-bold leading-9 tracking-tight text-light">
              Sign in to your account
            </Post.Title>
          </Container.Flex>

          <Container className="mt-5">
            <Container>
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

                <Container.Flex className="items-center justify-between">
                  <Form.Checkbox
                    field="rememberMe"
                    text="Remember me for 30 days"
                    onClick={() => setRememberMe(!rememberMe)}
                  />

                  <Container className="text-sm leading-6">
                    <Container.Link
                      href="#"
                      className={{
                        text: "dark:font-semibold cursor-pointer text-zinc-500 hover:text-zinc-400 dark:text-orange-tertiary dark:hover:text-orange-quaternary",
                      }}
                      text="Forgot your password?"
                    />
                  </Container>
                </Container.Flex>

                <Form.Button text="Sign in" />
              </Form>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Admin;
