import { Container } from "components/Container";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { MailIcon } from "components/AppIcons";
import { TextLayout } from "components/TextLayout";

// !Create backend for this section (modal confirming email and sending email)
const Contact = () => (
  <Form
    action="/thank-you"
    className={{
      border: "border border-zinc-100 p-6 dark:border-zinc-700/40",
      otherStyles: "rounded-2xl",
    }}
  >
    <TextLayout.Title
      as="h4"
      className="flex"
      AdditionalComponent={<MailIcon className="h-6 w-6 flex-none mr-3" />}
      title={"Let's connect"}
    />
    <TextLayout.Paragraph
      className={{ dimension: "mt-2", typography: "text-sm" }}
      paragraph="Get notified when I publish something new, and unsubscribe at any time."
    />
    <Container.Flex className="mt-6">
      <Form.Field
        variant="primary"
        field="email"
        type="email"
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

export default Contact;
