import logo from './logo.svg';
import Map from './components/Map'
import { useEffect, useState } from 'react';
function App() {
  let maps = [
    "PEARL", "HAVEN", "FRACtURE", "aSCent", "ICEBOX","BIND","BREEZE"];
  const [bannedMaps, setBannedMaps] = useState([]);
  const [pickedMaps, setPickedMaps] = useState([]);
  const [actions, setActions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [decider, setDecider] = useState(null);
  const [phase, setPhase] = useState("BANNING");
  const fetchData = function(url){
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setActions(data);
        if(data.length >= 2 && teams.length == 0){
          setTeams([data[0].team, data[1].team]);
        }
      });
  }
  let current_turn = 0;
  useEffect(() => {

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const url = params.get('url') + "?log_id=" + params.get('log_id');
    if(params.get('team1') && params.get('team2')){
    setTeams([params.get('team1'), params.get('team2')]);
    }
    console.log(url);
    fetchData(url);
    let x = setInterval(() => {
      fetchData(url);
    }, 5000);
    let y = setInterval(() => {
      let dots = document.getElementById("dots");
      if(dots.innerHTML.length >= 3){
        dots.innerHTML = "";
      }else{
        dots.innerHTML += ".";
      }
    }, 500);
    return () => {
      clearInterval(x);
      clearInterval(y);
    }
  }, []);
 useEffect(() => {
  let banned = [];
  let picked = [];
  let team_bans = [[],[]];
  let current_team = 0;
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].action == "ban") {
      banned.push(
        [actions[i].map.toLowerCase(), actions[i].team]
      );
    }else{
    if(actions[i].action == "pick"){
      picked.push([actions[i].map.toLowerCase(), actions[i].team]);
    }
    if(actions[i].action == "decider"){
      setDecider(actions[i].map.toLowerCase());
      
    }
    }
  }
  setBannedMaps(banned);
  setPickedMaps(picked);
  if(banned.length >= 4){
    setPhase("picking");
  }
  if(picked.length >= 2){
    setPhase("Game starts soon");
  }
  }, [actions]);
  return (
    <div className="App h-full w-full pt-16 font-ninjagarden relative overflow-hidden">
    
      <div className='w-full h-full absolute top-0 left-0' style={{ zIndex:-2 }}>
        <video src="videos/Comp_1.webm" className="w-full h-full object-cover" muted autoPlay loop={true} ></video>
      </div>
      <div className='w-full h-full absolute -top-8 left-0' style={{ zIndex: -1 }}>
        <video src="videos/logo_ani_omnys2.webm" className="w-full h-full object-cover" muted autoPlay loop={true} ></video>
      </div>
      <div className='flex justify-between text-8xl px-24'>
        <div className=' bg-gradient-to-r px-4 border-l-4 border-solid border-omnys-green from-omnys-green-light-transparent to-transparent bg-opacity-50'>
          <h1 className='font-ninjagarden text-white'>
            {teams.length >= 2 ? teams[0].toLowerCase() : "team 1"}
          </h1>
        </div>
        <div className='bg-gradient-to-l px-4 border-r-4 border-solid border-omnys-blue-light from-omnys-blue-light-transparent to-transparent'>
          <h1 className='font-ninjagarden text-white'>
            {teams.length >= 2 ? teams[1].toLowerCase() : "team 2"}
          </h1>
        </div>
      </div>
      <div className='px-24 w-full flex space-x-3 mt-16'>
        {maps.map((_, i) => {
          let is_decider = _.toLowerCase() == decider;
          let banned = bannedMaps.flat().includes(_.toLocaleLowerCase());
          let picked = pickedMaps.flat().includes(_.toLocaleLowerCase());
          let team = null;
          if(banned){
            team =  teams.indexOf(bannedMaps.filter(x => x[0] == _.toLocaleLowerCase())[0][1]);
          }else if(picked){
            team = teams.indexOf(pickedMaps.filter(x => x[0] == _.toLocaleLowerCase())[0][1]);
          }
          return (
          <Map key={i} 
              team = {team}
              picked={picked} 
              banned={banned} 
              decider={is_decider}
          name={_} />
          )
        })}
      </div>
      <div className='flex justify-between pl-16 pr-24 items-center'>
        <div className='h-48 w-96'>
          <img src="./images/one_moreeee.png" className='h-full w-full object-cover' alt="" />
        </div>
        <div>
          <h1  className='text-4xl font-ninjagarden relative text-white  '>
            {phase}
            <span className='text-4xl opacity-0 font-ninjagarden text-omnys-green-light'>
              ...
            </span>
            <span id="dots" className='text-4xl w-9 absolute right-0 bottom-0 font-ninjagarden text-omnys-green-light'>
              ...
            </span>
          </h1>
          
        </div>
      </div>
    </div>
  );
}

export default App;
