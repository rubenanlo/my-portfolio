import { useState } from "react";
import { Container } from "components/Container";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { TextLayout } from "components/TextLayout";
import Confirmation from "components/modals/Confirmation";
import { MailIcon } from "library/appIcons";
// import { useRouter } from "next/router";

// !Create backend for this section (modal confirming email and sending email)
const Contact = () => {
  const [formResponse, setFormResponse] = useState("");
  const [openModal, toggleModal] = useState(false);
  const [message, setMessage] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/contact/submit-response", {
      method: "POST",
      body: JSON.stringify({ email: formResponse }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      toggleModal(true);
      setMessage(
        "Thanks for subscribing! Check your email for confirmation (also the spam folder)."
      );
    }
    setFormResponse("");
    if (data.message === "Email already exists") {
      toggleModal(true);
      setMessage("This email is already in the database.");
      setFormResponse("");
    } else {
      console.log("Error:", data);
    }
  };

  return (
    <Container>
      <Form
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
            value={formResponse}
            onChange={(e) => setFormResponse(e.target.value)}
            placeholder="Email address"
            aria-label="Email address"
            required
          />
          {openModal && (
            <Confirmation toggleModal={toggleModal} message={message} />
          )}
          <Button
            variant="primary"
            type="submit"
            className="ml-4 flex-none"
            text="Connect"
          />
        </Container.Flex>
        <TextLayout.Paragraph
          paragraph="By clicking on the 'Connect' button, you let me keep your email. I will never share your email address with anyone else. Unsubscribe at any time."
          className="text-xs italic"
        />
      </Form>
    </Container>
  );
};

export default Contact;
