import { AnimatedContainer } from "components/ui/Container";
import { TextLayout } from "components/ui/TextLayout";
import { showUpAnimation } from "library/animations";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Confirmation = ({ toggleModal, message }) => (
  <AnimatedContainer
    {...showUpAnimation}
    className={{
      position: "absolute right-5",
      dimension: "mb-36 w-52 pl-8 pr-9 py-5",
      background: "bg-white",
      border: "rounded-lg shadow-lg shadow-black/90",
    }}
  >
    <button
      onClick={() => toggleModal(false)}
      className="absolute right-2 top-2"
    >
      <XMarkIcon className="h-6 w-6 text-orange-primary" aria-hidden="true" />
    </button>
    <TextLayout.Paragraph paragraph={message} />
  </AnimatedContainer>
);

export default Confirmation;
