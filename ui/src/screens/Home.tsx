import PageHead from "components/PageHead";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { BTN_CLASSNAMES } from "lib/constants";
import { Plus } from "react-feather";

// I'm thinking of a button to create a map and a dropdown using justify-between. Then the maps should go below

const HomeScreen = () => {
  const createNewMap = () => {
    apiClient
      .post("/maps")
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <PageHead />
      <button className={BTN_CLASSNAMES + " flex items-center justify-center"} onClick={createNewMap}>
        <Plus size={20} />
        <span>NEW MAP</span>
      </button>
    </main>
  );
};

export default HomeScreen;
