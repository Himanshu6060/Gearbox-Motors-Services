// import rolesData from "./rolesData";
import manufacturer from "../assets/roles/manufacturer.jpg";
import distributor from "../assets/roles/distributor.jpg";
import contractor from "../assets/roles/contractor.jpg";
import importer from "../assets/roles/importer.jpg";
import supplier from "../assets/roles/supplier.jpg";
import AboutIntro from "./AboutIntro";

const CoreRoles = () => {

    const rolesData = [
  {
    id: 1,
    title: "Manufacturer",
    image: manufacturer,
  },
  {
    id: 2,
    title: "Distributor",
    image: distributor,
  },
  {
    id: 3,
    title: "Government Contractor",
    image: contractor,
  },
  {
    id: 4,
    title: "Importer",
    image: importer,
  },
  {
    id: 5,
    title: "PSU Supplier",
    image: supplier,
  },
];

  return (
    <>
    <section className="coreRoles">
      <div className="container">

        <h2 className="sectionTitle">
          Our Core Roles
        </h2>

        <div className="rolesGrid">

          {rolesData.map((role) => (
            <div className="roleCard" key={role.id}>

              <h3>{role.title}</h3>

              <div className="imageBox">
                <img src={role.image} alt={role.title} />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
    <AboutIntro/>
    </>
  );
};

export default CoreRoles;