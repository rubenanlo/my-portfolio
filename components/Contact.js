import { Container } from "components/Container";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { TextLayout } from "components/TextLayout";
import { MailIcon } from "library/appIcons";
import { useState } from "react";
// import { useRouter } from "next/router";

// !Create backend for this section (modal confirming email and sending email)
const Contact = () => {
  const [formResponse, setFormResponse] = useState({ email: "" });
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/contact/submit-response", {
      method: "POST",
      body: JSON.stringify(formResponse),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setFormResponse({
        email: "",
      });
      // toggleModal();
    }
    if (data.message === "Email already exists") {
      // setIsLoading(false);
      // toggleModal();
      // router.push("/contact-form/already-submitted");
    } else {
      console.log("Error:", data);
    }
  };
  return (
    <Form
      action="/thank-you"
      className={{
        border: "border border-zinc-100 p-6 dark:border-zinc-700/40",
        otherStyles: "rounded-2xl",
      }}
      onSubmit={handleSubmit}
    >
      <TextLayout.Title
        as="h4"
        className="flex"
        AdditionalComponent={<MailIcon className="h-6 w-6 flex-none mr-3" />}
        title={"Let's connect"}
      />
      <TextLayout.Paragraph
        className={{ dimension: "mt-2", typography: "text-sm" }}
        paragraph="Get notified with new publications, or projects, and unsubscribe at any time."
      />
      <Container.Flex className="mt-6">
        <Form.Field
          variant="primary"
          field="email"
          type="email"
          onChange={(e) => setFormResponse({ email: e.target.value })}
          placeholder="Email address"
          aria-label="Email address"
          required
        />
        <Button
          variant="primary"
          type="submit"
          className="ml-4 flex-none"
          text="Join"
        />
      </Container.Flex>
    </Form>
  );
};

export default Contact;
