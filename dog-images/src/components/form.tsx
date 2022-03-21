import React from "react";

type FormProps = {
  onFormSubmit: (breed: string) => void
}

const Form: React.VFC<FormProps> = ({onFormSubmit}) => {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const breed = e.target.elements.namedItem("breed");
    if(breed && breed instanceof HTMLSelectElement) onFormSubmit(breed.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                <option value="shiba">Shiba</option>
                <option value="akita">Akita</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
