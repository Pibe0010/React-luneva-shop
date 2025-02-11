export const FormAddress = ({
  onSubmit,
  address,
  setAddress,
  street_number,
  setStreet_number,
  floor,
  setFloor,
  ladder_door,
  setLadder_door,
  city,
  setCity,
  postal_code,
  setPostal_code,
  country,
  setCountry,
  handleClick,
}) => {
  return (
    <form className="form-insert-address" onSubmit={onSubmit}>
      <label>
        <input
          className="input-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=""
          required=""
        />
        <span>Calle</span>
      </label>
      <div className="flex">
        <label>
          <input
            className="input-address"
            type="number"
            value={street_number}
            onChange={(e) => setStreet_number(e.target.value)}
            placeholder=""
            required=""
          />
          <span>Número</span>
        </label>
        <label>
          <input
            className="input-address"
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            placeholder=""
            required=""
          />
          <span>Escalera</span>
        </label>
      </div>
      <label>
        <input
          className="input-address"
          type="text"
          value={ladder_door}
          onChange={(e) => setLadder_door(e.target.value)}
          placeholder=""
          required=""
        />
        <span>Puerta</span>
      </label>
      <label>
        <input
          className="input-address"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder=""
          required=""
        />
        <span>Pais</span>
      </label>
      <label>
        <input
          className="input-address"
          type="number"
          value={postal_code}
          onChange={(e) => setPostal_code(e.target.value)}
          placeholder=""
          required=""
        />
        <span>Codigo postal</span>
      </label>
      <label>
        <input
          className="input-address"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder=""
          required=""
        />
        <span>Cuidad</span>
      </label>
      <button className="submit">Enviar</button>
      <button type="button" className="submit" onClick={handleClick}>
        Direcciónes existentes
      </button>
    </form>
  );
};
