import React from 'react';

import classes from "./Home.css";
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Home() {
  return (
    <div className={classes.HomePage}>
		<SearchBar />
        <div className={classes.CuisineWrapper}>
			<div className={classes.CuisinePanel}>
				<h2>Kuchnia Polska</h2>
				<img src="/ilustrations/polish-cuisine.png" alt="Polish cuisine" />
			</div>
			<div className={classes.CuisinePanel}>
				<h2>Kuchnia Włoska</h2>
				<img src="/ilustrations/italian-cuisine.png" alt="Italian cuisine" />
			</div>
			<div className={classes.CuisinePanel}>
				<h2>Kuchnia Meksykańska</h2>
				<img src="/ilustrations/mexican-cuisine.png" alt="Mexican cuisine" />
			</div>
			<div className={classes.CuisinePanel}>
				<h2>Kuchnia Amerykańska</h2>
				<img src="/ilustrations/american-cuisine.png" alt="American cuisine" />
			</div>
        </div>

    </div>
  )
}
