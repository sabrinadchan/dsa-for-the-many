const candidateConfig = {
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
}

var districtConfig = {
  "NY14": { displayName: "U.S. House, NY-14", lastUpdated: "2020-06-24"},
  "NY15": { displayName: "U.S. House, NY-15", lastUpdated: "2020-06-24"},
  //"NY16": { displayName: "U.S. House, NY-16 (NYC Only)", lastUpdated: "2020-06-24"},
  "SD18": { displayName: "NY State Senate, District 18", lastUpdated: "2020-08-07"},
  "SD25": { displayName: "NY State Senate, District 25", lastUpdated: "2020-08-07"},
  "AD36": { displayName: "NY State Assembly, District 36", lastUpdated: "2020-08-07"},
  "AD51": { displayName: "NY State Assembly, District 51", lastUpdated: "2020-08-07"},
  "AD57": { displayName: "NY State Assembly, District 57", lastUpdated: "2020-08-07"},
}

const table_cols = [
  {head: "Candidate", class: "name-cell", html: r => r.candidate }, 
  {head: "In Person", class: "num-cell", html: r => r.votes }, 
  {head: "Absentee", class: "num-cell", html: r => r.votes }, 
  {head: "Total", class: "num-cell", html: r => r.votes }, 
  {head: "Pct", class: "num-cell", html: (r, i) => percentage(d.votes, d.total)},
  {head: "", class: "num-cell", html: r => null },
  {head: "", class: "vote-share-cell", html: r => null },
]

// colors chosen with http://tristen.ca/hcl-picker/
// define color scales
const percentage = (n, d) => (d ? (n / d * 100) : 0).toFixed(2);

const assignWinnerColor = c => (c in candidateConfig ? candidateConfig[c].color : "#76797E");

const isWinner = c => (c in candidateConfig && "winner" in candidateConfig[c]);

//&#127801;
const rowHTML = (d, i) => `
    <td class='name-cell ${(isWinner(d.candidate) ? "winner" : "")}' ${isWinner(d.candidate) ? "style='background-color:" + assignWinnerColor(d.candidate) + ";'" : ""}>
      <table style='min-height:2em; border-collapse: collapse;'>
        <tr>
          <td style='background-color:${assignWinnerColor(d.candidate)}; width: 5px; padding:4px 0px; border-radius:3px;'>
          </td>
          <td style='padding-left:3px'>
            <span class='candidate-name'>${d.candidate} ${(isWinner(d.candidate) ? "<span class='win-symbol'>&#10003;</span>" : "")}</span>
          </td>
       </tr>
     </table>
    </td>
    <td class='num-cell'>${d.inPersonVotes.toLocaleString()}</td>
    <td class='num-cell'>${d.absenteeVotes.toLocaleString()}</td>
    <td class='num-cell'>${d.votes.toLocaleString()}</td>
    <td class='num-cell'>${percentage(d.votes, d.total)}</td>
    <td>${(!i ? "%" : "")}</td>
    <td class='vote-share-cell'>
      <div class='vote-share-bar' style='background-color:${assignWinnerColor(d.candidate)}; width:${percentage(d.votes, d.total)}%; height:10px;' />
    </td>`;

function buildHeader(div, district) {
  div.append("h2").html(`
    <img src='img/${district}.png' style='height:50px;width:50px;vertical-align: text-bottom;'/>
    ${districtConfig[district].displayName}
  `);
  div.append("hr");
}

function buildResultsTable(div, data) {
  var table = div.append("table").attr("class", "results-table"),
      thead = table.append("thead"),
      tbody = table.append("tbody");

  thead.append("tr")
      .selectAll("th")
      .data(table_cols)
    .enter().append("th")
      .attr("class", d => d.class)
      .html(d => d.head);

  tbody.selectAll("tr")
      .data(data)
    .enter().append("tr")
      .html(rowHTML);

}
