// colors chosen with http://tristen.ca/hcl-picker/
// define color scales
const percentage = (n, d) => (d ? (n / d * 100) : 0).toFixed(2);

const assignWinnerColor = c => (c in config[year]["candidates"] ? config[year]["candidates"][c].color : "#76797E");

const isWinner = c => (c in config[year]["candidates"] && "winner" in config[year]["candidates"][c]);

const displayName = c => (c in config[year]["candidates"] ? config[year]["candidates"][c]["displayName"] : c);

const styleCandidateName = r => `
    <table style='min-height:2em; border-collapse: collapse;'>
      <tr>
        <td style='background-color:${assignWinnerColor(r.candidate)}; width: 5px; padding:4px 0px; border-radius:3px;'>
        </td>
        <td style='padding-left:3px'>
          <span class='candidate-name'>${displayName(r.candidate)} ${(isWinner(r.candidate) ? "<span class='win-symbol'>&#10003;</span>" : "")}</span>
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
      "Alexandria Ocasio-Cortez": {color: "#EC1F27", winner: true, displayName: "Alexandria Ocasio-Cortez"},
      "Michelle Caruso-Cabrera": {color: "#5CC7DD", displayName: "Michelle Caruso-Cabrera"},
      "Badrun N. Khan": {color: "#BA80BF", displayName: "Badrun N. Khan"},
      "Samuel H. Sloan": {color: "#72D793", displayName: "Samuel H. Sloan"},
      "Samelys L\u00F3pez": {color: "#EC1F27", displayName: "Samelys L\u00F3pez"},
      "Ritchie Torres": {color: "#5CC7DD", winner: true, displayName: "Ritchie Torres"},
      "Rub\u00E9n D\u00EDaz": {color: "#BA80BF", displayName: "Rub\u00E9n D\u00EDaz"},
      "Michael A. Blake": {color: "#72D793", displayName: "Michael A. Blake"},
      "Ydanis Rodriguez": {color: "#E6CD58", displayName: "Ydanis Rodriguez"},
      "Jamaal Bowman": {color: "#EC1F27", displayName: "Jamaal Bowman"},
      "Eliot L. Engel": {color: "#5CC7DD", displayName: "Eliot L. Engel"},
      "Andom Ghebreghiorgis": {color: "#BA80BF", displayName: "Andom Ghebreghiorgis"},
      "Christopher Fink": {color: "#72D793", displayName: "Christopher Fink"},
      "Sammy Ravelo": {color: "#E6CD58", displayName: "Sammy Ravelo"},
      "Julia Salazar": {color: "#EC1F27", winner: true, displayName: "Julia Salazar"},
      "Andy J. Marte": {color: "#5CC7DD", displayName: "Andy J. Marte"},
      "Jabari Brisport": {color: "#EC1F27", winner: true, displayName: "Jabari Brisport"},
      "Tremaine S. Wright": {color: "#5CC7DD", displayName: "Tremaine S. Wright"},
      "Jason Salmon": {color: "#BA80BF", displayName: "Jason Salmon"},
      "Zohran Kwame Mamdani": {color: "#EC1F27", winner: true, displayName: "Zohran Kwame Mamdani"},
      "Aravella Simotas": {color: "#5CC7DD", displayName: "Aravella Simotas"},
      "Marcela Mitaynes": {color: "#EC1F27", winner: true, displayName: "Marcela Mitaynes"},
      "Felix W. Ortiz": {color: "#5CC7DD", displayName: "Felix W. Ortiz"},
      "Genesis E. Aquino": {color: "#BA80BF", displayName: "Genesis E. Aquino"},
      "Katherine P. Walsh": {color: "#72D793", displayName: "Katherine P. Walsh"},
      "Phara Souffrant Forrest": {color: "#EC1F27", winner: true, displayName: "Phara Souffrant Forrest"},
      "Walter T. Mosley III": {color: "#5CC7DD", displayName: "Walter T. Mosley III"},
      "Write-In": {color: "#76797E", displayName: "Write-In"},
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
      "Adolfo Abreu": {color: "#EC1F27", displayName: "Adolfo Abreu"},
      "Tiffany Caban": {color: "#EC1F27", displayName: "Tiffany Cabán"},
      "Jaslin Kaur": {color: "#EC1F27", displayName: "Jaslin Kaur"},
      "Michael Hollingsworth": {color: "#EC1F27", displayName: "Michael Hollingsworth"},
      "Alexa Aviles": {color: "#EC1F27", displayName: "Alexa Avilés"},
      "Brandon West": {color: "#EC1F27", displayName: "Brandon West"},
      "Haile Rivera": {displayName: "Haile Rivera"},
      "Yudelka Tapia": {displayName: "Yudelka Tapia"},
      "Pierina Ana Sanchez": {displayName: "Pierina Ana Sanchez"},
      "Socrates S. Solano": {displayName: "Socrates S. Solano"},
      "Fernando A. Aquino": {displayName: "Fernando A. Aquino"},
      "Nick Velkov": {displayName: "Nick Velkov"},
      "Catherina Gioino": {displayName: "Catherina Gioino"},
      "John J. Ciafone": {displayName: "John J. Ciafone"},
      "Evie Hantzopoulos": {displayName: "Evie Hantzopoulos"},
      "Leonardo T. Bullaro": {displayName: "Leonardo T. Bullaro"},
      "Linda Lee": {displayName: "Linda Lee"},
      "Debra Markell": {displayName: "Debra Markell"},
      "Sanjeev Kumar Jindal": {displayName: "Sanjeev Kumar Jindal"},
      "Koshy O. Thomas": {displayName: "Koshy O. Thomas"},
      "Harpreet S. Toor": {displayName: "Harpreet S. Toor"},
      "Steve Behar": {displayName: "Steve Behar"},
      "Deirdre M. Levy": {displayName: "Deirdre M. Levy"},
      "Curtis M. Harris": {displayName: "Curtis M. Harris"},
      "Regina A. Kinsey": {displayName: "Regina A. Kinsey"},
      "Crystal Hudson": {displayName: "Crystal Hudson"},
      "Hector Robertson": {displayName: "Hector Robertson"},
      "Renee T. Collymore": {displayName: "Renee T. Collymore"},
      "Victor Swinton": {displayName: "Victor Swinton"},
      "Jacqui Painter": {displayName: "Jacqui Painter"},
      "Cesar Zuniga": {displayName: "Cesar Zuniga"},
      "Yu Lin": {displayName: "Yu Lin"},
      "Rodrigo G. Camarena": {displayName: "Rodrigo G. Camarena"},
      "Mamnun M. Haq": {displayName: "Mamnun M. Haq"},
      "Douglas M. Schneider": {displayName: "Douglas M. Schneider"},
      "Shahana K. Hanif": {displayName: "Shahana K. Hanif"},
      "Briget Rein": {displayName: "Briget Rein"},
      "Justin M. Krebs": {displayName: "Justin M. Krebs"},
      "Jessica Simmons": {displayName: "Jessica Simmons"},
      "Write-In": {color: "#76797E", displayName: "Write-In"},
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
