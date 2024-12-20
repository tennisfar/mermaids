// https://codepen.io/mikelothar/pen/wvjRxNw?editors=0010
// https://www.zenflowchart.com/flowchart

const mermaid = document.querySelector(".mermaid");
mermaid.innerHTML = `
flowchart TB


style 20313 fill:#f00
style 20317 fill:#f00

subgraph DliOrDloSlut[DLI eller DLO side]
  DsSlut[Slut]
end

subgraph missing1[Mangler i flow]
  20313[IU-20313: Vinderbeskeder]
end

subgraph missing2[Mangler i flow]
  20317[IU-20317: Send dokument]
end

subgraph resetPassword[Eksisterende side]
  ResetPassword[Nulstil adgangskode]
end

subgraph reciept[Kvittering - Statisk side]
  20316 ==> |Gå til Return Url| DsSlut
end

subgraph mitId[MitID]
  LogInMitID[Log ind med MitID]
end

subgraph recieptError[Kvittering fejlside - Statisk side]
  20315 --> |Nulstil adgangskode| ResetPassword
  20315 --> |Fortsæt til Brand| DsSlut
end

subgraph Start[Start - Statisk side i Sitecore]
  20304[IU-20304: Start oprettelse]
end

DliOrDloStart[DLI eller DLO side] ==> |Opret konto| 20304
  
subgraph flow[Oprettelsesflow - ReactJS]
  20305[IU-20305: Afbryd oprettelse]
  20306[IU-20306: Kontaktinformation]
  20307[IU-20307: Kontaktinformation - email findes allerede]
  20308[IU-20308: Personlig information]
  20309[IU-20309: Opret login]
  20310[IU-20310: Indbetalingsgrænse]
  20311[IU-20311: Spil med omtanke]
  20312[IU-20312: Markedsføring]
  20314[IU-20314: Bekræft med MitID]
  20315[IU-20315: Eksisterende bruger besked]
  20316[IU-20316: Ny bruger besked]
  
  20304 ==> |Kom i gang| 20306
  
  20304 <--> |Afbryd| 20305
  20305 --> |Ja, annuller og luk| DsSlut
  
  20306 -.-> |Tilbage| 20304
  
  20306 ==> |Fortsæt| ValidateEmail[(Validér email i PAM)]
  ValidateEmail ==> |Email findes ikke i PAM| 20308
  ValidateEmail --> |Email findes i PAM| 20307
  
  20306 <--> |Afbryd| 20305
  
  20307 -.-> |Tilbage| 20306
  20307 --> |Log ind med MitID| LogInMitID --> DsSlut
  20307 --> |Indtast ny mail| 20306
  
  20308 ==> |Fortsæt| 20309
  20308 -.-> |Tilbage| 20306
  20308 <--> |Afbryd| 20305
  
  20309 ==> |Opret login| 20310
  20309 -.-> |Tilbage| 20308
  20309 <--> |Afbryd| 20305
  
  20310 ==> |Sæt grænse| 20311
  20310 -.-> |Tilbage| 20309
  20310 <--> |Afbryd| 20305
  
  20311 ==> |Accepter| 20312
  20311 -.-> |Tilbage| 20310
  20311 <--> |Afbryd| 20305
  
  20312 ==> |Ja tak| 20314
  20312 -.-> |Tilbage| 20311
  20312 <--> |Afbryd| 20305
  
  20312 ==> |Nej tak| 20314
  
  20314 ==> |Log ind med MitID| ValidateMitID[(Validér MitID)]
  20314 <--> |Afbryd| 20305
  
  ValidateMitID --> |Bruger findes i DS| 20315
  ValidateMitID ==> |Bruger findes ikke i DS| 20316
end



`;
