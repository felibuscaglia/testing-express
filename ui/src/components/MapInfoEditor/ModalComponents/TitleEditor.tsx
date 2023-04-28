import { SELECTED_MAP_CONTEXT } from "contexts/SelectedMapContext";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import {
  BTN_CLASSNAMES,
  SECONDARY_BTN_CLASSNAMES,
  UNEXPECTED_ERROR_MESSAGE,
} from "lib/constants";
import { API_PATHS } from "lib/enums";
import { showToastWithErrorMessage } from "lib/helpers";
import { IMapInfoEditorComponentProps } from "lib/interfaces";
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";

interface ITitleEditorInput {
  name: string;
  description?: string;
}

const INPUT_CLASSNAMES = "border-main-brand-color border w-full mb-5 px-2 py-1";

const TitleEditor: FC<IMapInfoEditorComponentProps> = ({
  setDisplayModal,
  setLoadingChanges,
  setUpdatedAt,
}) => {
  const { map, setMap } = useContext(SELECTED_MAP_CONTEXT);

  const [input, setInput] = useState<ITitleEditorInput>({
    name: map.name,
    description: map.description ?? "",
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
    setInput({
      ...input,
      [key]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingChanges(true);
    setMap({
      ...map,
      name: input.name,
      description: input.description,
    });
    setDisplayModal(false);

    apiClient
      .patch(`${API_PATHS.GET_MAP}/${map.id}`, input)
      .then((res) => {
        setLoadingChanges(false);
        setUpdatedAt(new Date());
      })
      .catch((err) => {
        let errorMessage = UNEXPECTED_ERROR_MESSAGE;

        if (err.response) {
          const { data } = err.response;
          errorMessage = data.message;
        }

        showToastWithErrorMessage(errorMessage);
        setLoadingChanges(false);
      }); // TODO: Handle error in the LoadingIndicator component.
  };

  return (
    <form
      className="p-7 flex flex-col items-center"
      onSubmit={(e) => handleSubmit(e)}
    >
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
