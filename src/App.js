import { useEffect, useState } from "react";
import "./index.css";

function CountryCard({ country }) {
  return (
    <div className="countryCard">
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="card__img"
      />
      <h2>{country.name.common}</h2>
    </div>
  );
}

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log("Error fetching API"));
  });

  useEffect(() => {
    if (search) {
      setSearchCountries([
        ...countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  }, [search, countries]);

  return (
    <div className="wrapper">
      <div className="search__wrapper">
        <input
          type="text"
          placeholder="Search for countries..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div class="containerStyle">
        {search &&
          searchedCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        {!search &&
          countries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </div>
    </div>
  );
}


