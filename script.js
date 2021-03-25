//API Docs: http://ergast.com/mrd/

const apiURL = "http://ergast.com/api/f1";
const raceTableBody = document.getElementById("raceTableBody");

async function getRaceDataForYear(year) {
  return new Promise((resolve, reject) => {
    fetch(`${apiURL}/${year}.json`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return resolve(json.MRData.RaceTable);
      });
  });
}

function renderRaceData(data) {
  let header = document.getElementById("headerTitle");
  header.innerText = `F1 Racing - ${data.Races[0].season}`;

  while (raceTableBody.firstChild) {
    raceTableBody.removeChild(raceTableBody.firstChild);
  }

  for (race of data.Races) {
    let tableRow = document.createElement("tr");
    let tableCellRound = document.createElement("td");
    let tableCellName = document.createElement("td");
    let tableCellDate = document.createElement("td");
    let tableCellLocation = document.createElement("td");

    tableCellRound.innerText = race.round;
    tableCellName.innerText = race.raceName;
    tableCellDate.innerText = race.date;
    tableCellLocation.innerText = `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`;

    tableRow.appendChild(tableCellRound);
    tableRow.appendChild(tableCellName);
    tableRow.appendChild(tableCellDate);
    tableRow.appendChild(tableCellLocation);

    raceTableBody.appendChild(tableRow);
  }
}

async function runApp() {
  console.log(await getRaceDataForYear(2011));
  console.log(await getRaceDataForYear(2012));
  renderRaceData(await getRaceDataForYear(2021));
}

runApp();
