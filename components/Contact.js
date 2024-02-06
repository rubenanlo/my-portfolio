import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Container } from "components/Container";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { TextLayout } from "components/TextLayout";
import Confirmation from "components/modals/Confirmation";
import { MailIcon } from "library/appIcons";

const Contact = () => {
  const [formResponse, setFormResponse] = useState("");
  const [openModal, toggleModal] = useState(false);
  const [message, setMessage] = useState("");

  const { t } = useTranslation("contact");

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
      setMessage(t("success"));
    }
    setFormResponse("");
    if (data.message === "Email already exists") {
      toggleModal(true);
      setMessage(t("error"));
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
          title={t("title")}
        />
        <TextLayout.Paragraph
          className={{ dimension: "mt-2", typography: "text-sm" }}
          paragraph={t("description")}
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
            text={t("button")}
          />
        </Container.Flex>
        <TextLayout.Paragraph
          paragraph={t("legal")}
          className="text-xs italic"
        />
      </Form>
    </Container>
  );
};

export default Contact;
