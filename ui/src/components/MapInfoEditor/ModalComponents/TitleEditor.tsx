import { BTN_CLASSNAMES, SECONDARY_BTN_CLASSNAMES } from "lib/constants";
import { IMapInfoEditorComponentProps } from "lib/interfaces";
import { ChangeEvent, FC, useState } from "react";

interface ITitleEditorInput {
  name: string;
  description?: string;
}

const INPUT_CLASSNAMES = "border-main-brand-color border w-full mb-5 px-2 py-1";

// TODO: Handle input save.

const TitleEditor: FC<IMapInfoEditorComponentProps> = ({
  name,
  description,
  setDisplayModal,
}) => {
  const [input, setInput] = useState<ITitleEditorInput>({
    name,
    description: description ?? "",
  });

  const inputs = [
    {
      id: "name",
      label: "Name",
      value: input.name,
    },
    {
      id: "description",
      label: "Description",
      textArea: true,
      value: input.description,
    },
  ];

  const handleInputChange = (value: string, key: string) => {
    console.log({ key, value });
    setInput({
      ...input,
      [key]: value,
    });
  };

  return (
    <form className="p-7 flex flex-col items-center">
      <h5 className="mb-5 font-bold text-2xl">Edit map name and description</h5>
      {inputs.map(({ id, label, textArea, value }) => {
        const inputProps = {
          className: INPUT_CLASSNAMES,
          id,
          value,
          onChange: ({
            target,
          }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleInputChange(target.value, target.id),
        };

        return (
          <section
            className="flex flex-col items-start w-full"
            key={`title-editor-input-${id}`}
          >
            <label htmlFor={id}>{label}</label>
            {textArea ? (
              <textarea {...inputProps} />
            ) : (
              <input {...inputProps} />
            )}
          </section>
        );
      })}
      <section className="flex items-center justify-center mt-5 gap-3">
        <button
          className={SECONDARY_BTN_CLASSNAMES}
          onClick={() => setDisplayModal(false)}
        >
          Cancel
        </button>
        <button className={BTN_CLASSNAMES}>Save</button>
      </section>
    </form>
  );
};

export default TitleEditor;
