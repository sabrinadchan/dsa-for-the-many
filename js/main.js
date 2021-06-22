// colors chosen with http://tristen.ca/hcl-picker/
// define color scales
const percentage = (n, d) => (d ? (n / d * 100) : 0).toFixed(2);

const assignWinnerColor = c => (c in config[year]["candidates"] ? config[year]["candidates"][c].color : "#76797E");

const isWinner = c => (c in config[year]["candidates"] && "winner" in config[year]["candidates"][c]);

const styleCandidateName = r => `
    <table style='min-height:2em; border-collapse: collapse;'>
      <tr>
        <td style='background-color:${assignWinnerColor(r.candidate)}; width: 5px; padding:4px 0px; border-radius:3px;'>
        </td>
        <td style='padding-left:3px'>
          <span class='candidate-name'>${r.candidate} ${(isWinner(r.candidate) ? "<span class='win-symbol'>&#10003;</span>" : "")}</span>
        </td>
      </tr>
    </table>`;

const winnerBar = r => `<div class='vote-share-bar' style='background-color:${assignWinnerColor(r.candidate)}; width:${percentage(r.votes, r.total)}%; height:10px;' />`;

const absenteeColumns = [
  {head: "Candidate", class: "name-cell", tdClass: r => `${(isWinner(r.candidate) ? "winner" : "")}`, style: r => `${isWinner(r.candidate) ? "background-color:" + assignWinnerColor(r.candidate) + ";" : ""}`, html: r => styleCandidateName(r)
   }, 
  {head: "In Person", class: "num-cell", html: r => r.inPersonVotes.toLocaleString() }, 
  {head: "Absentee", class: "num-cell", html: r => r.absenteeVotes.toLocaleString() }, 
  {head: "Total", class: "num-cell", html: r => r.votes.toLocaleString() }, 
  {head: "Pct", class: "num-cell", html: (r, i) => percentage(r.votes, r.total)},
  {head: "", class: null, html: (_, i) => (!i ? "%" : "") },
  {head: "", class: "vote-share-cell", html: r => winnerBar(r) },
];

const columns = [
  {head: "Candidate", class: "name-cell", tdClass: r => `${(isWinner(r.candidate) ? "winner" : "")}`, style: r => `${isWinner(r.candidate) ? "background-color:" + assignWinnerColor(r.candidate) + ";" : ""}`, html: r => styleCandidateName(r)
   }, 
  {head: "Votes", class: "num-cell", html: r => r.votes.toLocaleString() }, 
  {head: "Pct", class: "num-cell", html: (r, i) => percentage(r.votes, r.total)},
  {head: "", class: null, html: (_, i) => (!i ? "%" : "") },
  {head: "", class: "vote-share-cell", html: r => winnerBar(r) },
];

const config = {
  "2020": {
    "election": "2021 NY Democratic Primary",
    "candidates": {
      "Alexandria Ocasio-Cortez": {color: "#EC1F27", winner: true},
      "Michelle Caruso-Cabrera": {color: "#5CC7DD", },
      "Badrun N. Khan": {color: "#BA80BF", },
      "Samuel H. Sloan": {color: "#72D793", },
      "Samelys L\u00F3pez": {color: "#EC1F27", },
      "Ritchie Torres": {color: "#5CC7DD", winner: true},
      "Rub\u00E9n D\u00EDaz": {color: "#BA80BF", },
      "Michael A. Blake": {color: "#72D793", },
      "Ydanis Rodriguez": {color: "#E6CD58", },
      "Jamaal Bowman": {color: "#EC1F27", },
      "Eliot L. Engel": {color: "#5CC7DD", },
      "Andom Ghebreghiorgis": {color: "#BA80BF", },
      "Christopher Fink": {color: "#72D793", },
      "Sammy Ravelo": {color: "#E6CD58", },
      "Julia Salazar": {color: "#EC1F27", winner: true},
      "Andy J. Marte": {color: "#5CC7DD", },
      "Jabari Brisport": {color: "#EC1F27", winner: true},
      "Tremaine S. Wright": {color: "#5CC7DD", },
      "Jason Salmon": {color: "#BA80BF", },
      "Zohran Kwame Mamdani": {color: "#EC1F27", winner: true},
      "Aravella Simotas": {color: "#5CC7DD", },
      "Marcela Mitaynes": {color: "#EC1F27", winner: true},
      "Felix W. Ortiz": {color: "#5CC7DD", },
      "Genesis E. Aquino": {color: "#BA80BF"},
      "Katherine P. Walsh": {color: "#72D793", },
      "Phara Souffrant Forrest": {color: "#EC1F27", winner: true},
      "Walter T. Mosley III": {color: "#5CC7DD", },
    },
    "districts": {
      "NY14": { district: "NY14", headerName: "U.S. House, NY-14", dropDownName: "US Congress NY-14 (Ocasio-Cortez)", file: "Representative in Congress - District 14.tsv", lastUpdated: "2020-06-24"},
      "NY15": { district: "NY15", headerName: "U.S. House, NY-15", dropDownName: "US Congress NY-15 (L\u00F3pez)", file: "Representative in Congress - District 15.tsv", lastUpdated: "2020-06-24"},
      "SD18": { district: "SD18", headerName: "NY State Senate, District 18", dropDownName: "SD-18 (Salazar)", file: "State Senator - District 18.tsv", lastUpdated: "2020-08-07"},
      "SD25": { district: "SD25", headerName: "NY State Senate, District 25", dropDownName: "SD-25 (Brisport)", file: "State Senator - District 25.tsv", lastUpdated: "2020-08-07"},
      "AD36": { district: "AD36", headerName: "NY State Assembly, District 36", dropDownName: "AD-36 (Mamdani)", file: "Member of the Assembly - District 36.tsv", lastUpdated: "2020-08-07"},
      "AD51": { district: "AD51", headerName: "NY State Assembly, District 51", dropDownName: "AD-51 (Mitaynes)", file: "Member of the Assembly - District 51.tsv", lastUpdated: "2020-08-07"},
      "AD57": { district: "AD57", headerName: "NY State Assembly, District 57", dropDownName: "AD-57 (Souffrant Forrest)", file: "Member of the Assembly - District 57.tsv", lastUpdated: "2020-08-07"},
    },
    "columns": absenteeColumns,
  },
  "2021": {
    "election": "2021 NYC Democratic Primary",
    "candidates": {
      "Adolfo Abreu": {color: "#EC1F27", },
      "Tiffany Cabán": {color: "#EC1F27", },
      "Jaslin Kaur": {color: "#EC1F27", },
      "Michael Hollingsworth": {color: "#EC1F27", },
      "Alexa Avilés": {color: "#EC1F27", },
      "Brandon West": {color: "#EC1F27", },
    },
    "districts": {
      "CD14": { district: "CD14", headerName: "NYC Council, The Bronx, District 14", dropDownName: "CD-14 (Abreu)", file: "Member of the City Council - District 14.tsv", lastUpdated: "2021-06-22"},
      "CD22": { district: "CD22", headerName: "NYC Council, Queens, District 22", dropDownName: "CD-22 (Cabán)", file: "Member of the City Council - District 22.tsv", lastUpdated: "2021-06-22"},
      "CD23": { district: "CD23", headerName: "NYC Council, Queens, District 23", dropDownName: "CD-23 (Kaur)", file: "Member of the City Council - District 23.tsv", lastUpdated: "2021-06-22"},
      "CD35": { district: "CD35", headerName: "NYC Council, Brooklyn, District 35", dropDownName: "CD-35 (Hollingsworth)", file: "Member of the City Council - District 35.tsv", lastUpdated: "2021-06-22"},
      "CD38": { district: "CD38", headerName: "NYC Council, Brooklyn, District 38", dropDownName: "CD-38 (Avilés)", file: "Member of the City Council - District 38.tsv", lastUpdated: "2021-06-22"},
      "CD39": { district: "CD39", headerName: "NYC Council, Brooklyn, District 39", dropDownName: "CD-39 (West)", file: "Member of the City Council - District 39.tsv", lastUpdated: "2021-06-22"},
    },
    "columns": columns,
  }
}

function buildHeader(div, district) {
  div.append("h2").html(`
    <img src='img/candidates/${year}/${district}.png' style='height:50px;width:50px;vertical-align: text-bottom;'/>
    ${config[year]["districts"][district].headerName}
  `);
  div.append("hr");
}

function buildTableRows(tbody, data, columns) {
  var rows = tbody.selectAll("tr")
      .data(data)
    .enter().append("tr");

  rows.selectAll("td")
      .data((row, i) => columns.map(c => {
        var cell = {};
        Object.keys(c).forEach(k => {
          cell[k] = typeof c[k] == 'function' ? c[k](row) : c[k];
        });
        return cell;
      }))
    .enter().append("td")
      .attr("class", d => d.class + ("tdClass" in d ? " " + d.tdClass : ""))
      .attr("style", d => d.style)
      .html(d => d.html);
}

function buildResultsTable(div, data, columns) {
  var table = div.append("table").attr("class", "results-table"),
      thead = table.append("thead"),
      tbody = table.append("tbody");

  thead.append("tr")
      .selectAll("th")
      .data(columns)
    .enter().append("th")
      .attr("class", d => d.class)
      .html(d => d.head);

  buildTableRows(tbody, data, columns);
}
