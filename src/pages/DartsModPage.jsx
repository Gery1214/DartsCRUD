import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const DartsModPage = () => {
  const { dartsId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    id: Number(dartsId),
    name: "",
    birth_date: "",
    world_ch_won: 0,
    profile_url: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get("https://darts.sulla.hu/darts");
        const foundPlayer = response.data.find((p) => p.id === Number(dartsId));
        if (foundPlayer) {
          setPlayer({
            id: foundPlayer.id,
            name: foundPlayer.name,
            birth_date: foundPlayer.birth_date,
            world_ch_won: foundPlayer.world_ch_won,
            profile_url: foundPlayer.profile_url,
            image_url: foundPlayer.image_url,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayer();
  }, [dartsId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: name === "world_ch_won" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://darts.sulla.hu/darts/${dartsId}`, {
        id: Number(dartsId),
        name: player.name,
        birth_date: player.birth_date,
        world_ch_won: Number(player.world_ch_won),
        profile_url: player.profile_url,
        image_url: player.image_url,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 content bg-ivory text-center">
      <h2>Dartsozó módosítása</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              value={player.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Születési dátum:</label>
          <div className="col-sm-9">
            <input
              type="date"
              name="birth_date"
              className="form-control"
              value={player.birth_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="world_ch_won"
              className="form-control"
              value={player.world_ch_won}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Profil URL (Wiki):</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="profile_url"
              className="form-control"
              value={player.profile_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="image_url"
              className="form-control"
              value={player.image_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Mentés
        </button>
      </form>
    </div>
  );
};