// Iteration 1: All directors? - Get the array of all directors.
// How could you "clean" a, I think the  bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArr) {
  return moviesArr.map((movie) => {
    return movie.director;
  });
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
function getAllSingleDirectors(moviesArr) {
  
  const directors = getAllDirectors(moviesArr);

  return directors.filter((director) => {
    return !directors.includes(director);
  });

}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArr) {
  return moviesArr.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArr) {
  if (!moviesArr.length) {
    return 0;
  } else {
    let total = moviesArr.reduce((acc, movie) => {
      if (movie.score) {
        const updatedAcc = acc + movie.score;
        return updatedAcc;
      } else {
        // Return average even if one of the movies does not have score!
        return acc;
      }
    }, 0);

    // you can use Number(), parseInt() or simply plus +
    return Number((total / moviesArr.length).toFixed(2));
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArr) {
  if (!moviesArr.length) {
    return 0;
  } else if (moviesArr.length === 1) {
    return moviesArr[0].score;
  } else {
    let dramaMovies = moviesArr.filter((movie) =>
      movie.genre.includes('Drama')
    );
    return scoresAverage(dramaMovies);
  }
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArr) {
  const moviesArrCopy = [...moviesArr];

  moviesArrCopy.sort(function (a, b) {
    if (a.year > b.year) {
      return 1;
    } else if (a.year < b.year) {
      return -1;
    } else {
      // If both movies have the same year, order them by title
      if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  return moviesArrCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArr) {
  const moviesArrCopy = [...moviesArr];
  const orderedMovies = moviesArrCopy
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((movie) => movie.title)
    .slice(0, 20);
  return orderedMovies;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function convertHoursToMInutes(hours) {
  return hours * 60;
}

function durationToMinutes(durationString) {
  const timeStrings = durationString.split(' ');

  const timeInMinutes = timeStrings.reduce(function (total, string) {
    if (string.includes('h')) {
      const numOfHours = parseInt(string);
      let updatedTotal = total + convertHoursToMInutes(numOfHours);
      return updatedTotal;
    } else {
      let updatedTotal = total + parseInt(string); // parse the minutes string   "33min"
      return updatedTotal;
    }
  }, 0);

  return timeInMinutes;
}

function turnHoursToMinutes(moviesArr) {
  const moviesArrCopy = [...moviesArr];

  const formatedMovies = moviesArrCopy.map(function (oneMovie) {
    const formatedMovie = { ...oneMovie };
    formatedMovie.duration = durationToMinutes(oneMovie.duration);

    return formatedMovie;
  });

  return formatedMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArr) {
  if (!moviesArr.length) return null;

  let averageScore = 0;

  let yearScore = 0;

  let yearMovies = [];

  if (moviesArr.length === 1) {
    yearScore = moviesArr[0].year;
    averageScore = moviesArr[0].score;
  }

  moviesArr
    .map((movie) => movie.year)
    .forEach((year) => {
      if (!yearMovies.includes(year)) {
        yearMovies.push(year);
      }
    });

  yearMovies.forEach((year) => {
    let moviesOfTheYear = moviesArr.filter((movie) => movie.year === year);

    let currentAvg = moviesOfTheYear.reduce((acc, movie) => {
      acc += movie.score / moviesOfTheYear.length;
      return acc;
    }, 0);

    if (currentAvg > averageScore) {
      averageScore = currentAvg;
      yearScore = year;
    } else if (currentAvg === averageScore) {
      if (yearScore > year) {
        yearScore = year;
      }
    }
  });

  return `The best year was ${yearScore} with an average score of ${averageScore}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getAllSingleDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
