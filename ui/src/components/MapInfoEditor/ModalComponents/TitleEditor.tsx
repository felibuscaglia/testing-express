import { BTN_CLASSNAMES, SECONDARY_BTN_CLASSNAMES } from "lib/constants";

const INPUTS = [
  {
    id: "mapTitle",
    label: "Title",
  },
  {
    id: "mapDescription",
    label: "Description",
    textArea: true,
  },
];

const INPUT_CLASSNAMES = "border-main-brand-color border w-full mb-5 px-2 py-1";

const TitleEditor = () => {
  return (
    <form className="p-7 flex flex-col items-center">
      <h5 className="mb-5 font-bold text-2xl">Edit map name and description</h5>
      {INPUTS.map(({ id, label, textArea }) => (
        <section
          className="flex flex-col items-start w-full"
          key={`title-editor-input-${id}`}
        >
          <label htmlFor={id}>{label}</label>
          {textArea ? (
            <textarea className={INPUT_CLASSNAMES} id={id} />
          ) : (
            <input className={INPUT_CLASSNAMES} id={id} />
          )}
        </section>
      ))}
      <button className={BTN_CLASSNAMES + " mt-5 w-1/4"}>Save</button>
    </form>
  );
};

export default TitleEditor;
