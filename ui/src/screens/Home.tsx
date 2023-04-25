import NewMapButton from "components/NewMapButton";
import PageHead from "components/PageHead";

// I'm thinking of a button to create a map and a dropdown using justify-between. Then the maps should go below

const HomeScreen = () => {
  return (
    <main>
      <PageHead />
     <NewMapButton />
    </main>
  );
};

export default HomeScreen;
