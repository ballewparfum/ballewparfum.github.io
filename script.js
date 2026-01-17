const scents = {
  provocative: {
    title:"PROVOCATIVE",
    notes:"Wood · Amber · Cacao · Pepper",
    desc:"Designed to command attention. Warm, dark and addictive — this scent turns presence into power."
  },
  elusive: {
    title:"ELUSIVE",
    notes:"Bergamot · Sandalwood · Black Musk · Oud",
    desc:"Mysterious and magnetic. A fragrance that lingers in memory long after you leave."
  },
  apparition: {
    title:"APPARITION",
    notes:"White Musk · Rose · Amber · Apple Blossom",
    desc:"Soft, radiant and sensual — a ghost of beauty that surrounds you."
  },
  desert: {
    title:"DESERT APPARITION",
    notes:"White Musk · Sandalwood · Marine · Apple Blossom",
    desc:"Airy, warm and untouchable — like a mirage in golden light."
  }
};

function openScent(key){
  document.getElementById("scentTitle").innerText = scents[key].title;
  document.getElementById("scentNotes").innerText = scents[key].notes;
  document.getElementById("scentDesc").innerText = scents[key].desc;

  if (typeof setBuyLinks === "function") {
    setBuyLinks(key);
  }

  document.getElementById("scentModal").style.display="flex";
}

function closeScent(){
  document.getElementById("scentModal").style.display="none";
}

function openClub(){
  document.getElementById("clubModal").style.display="flex";
}

function closeClub(){
  document.getElementById("clubModal").style.display="none";
}
