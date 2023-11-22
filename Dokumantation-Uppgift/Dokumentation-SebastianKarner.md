## Dokumantation Sebastian Kärner

### Beskrivning av arbetets gång.

Detta projekt har nu följt med oss sedan någon vecka in på "Projektkunskap enligt agila metoder"-kursen.
Det var i den kursen som vi fick introduktionen till detta spel som vi skulle skapa i kommande kurser framöver.

Vi började tidigt med att sätta ihop en kravspec, SMARTA mål samt lägga en planering för hur vi skulle gå till väga för
att nå målet.

Efter detta så la vi in alla våra moment och uppgifter i JIRA och la en preliminär plan utifrån den information vi hade.
Vi började också tidigt spåna på en design för vårat spel och det landade i ett 80-tals tema.

När vi sedan gick över på Spring boot och backend så viste vi tidigt vilka funktioner och features vi ville ha med, men
vid denna tidpunkt hade vi bristande kunskap om både spring boot och Frontend-biten vilket gjorde att vi efter en stund
bestämde oss för att gå
lite mer åt "grundutförande" hållet istället för att försöka implememtera massa extrafunktioner redan från start.

Vi fick ihop en riktigt bra och välfungerande backend med koppling till en Postgres Databas, sedan fortsatte vi
individuellt och implementerade Security-funktioner med JWT Tokens bland annat.

När vi sedan gick över på HTML/CSS kursen så startade vi arbetet med designen och strukturen på vårat spel. Här satt vi
länge och övervägde olika designer och strukturer fram och tillbaka för att försöka hitta något som är så lättanvänt som
möjligt.
Målet var att komma fram till en design som gjorde att användaren i princip inte kan göra fel, utan att varje sida
skulle vara väldigt "förklarande" och tydlig.

Arbetet med vår Frontend gick väldigt smidigt och bra, vi har hela vägen hållt oss till temat och designen som vi
spikade i projektkursen, men vi har behövt tweaka det lite här och där för att det ska fungera i praktiken. Vi kände oss
nu redo för att gå över på JavaScript och koppla ihop våra två skapelser till en helhet.

Att koppla ihop vår backend med vår frontend var den svåraste biten av projektet enligt mig, här var det väldigt mycket
frågetecken från början och vi satt länge och försökte få till funktioner men lyckades inte riktigt få allt att klaffa
på en gång.
När vi sedan gick igenom "FETCH" så var det väldigt mycket som klarnade och föll på plats. Vi började med att skriva ett
js-api med alla våra fetchar och därefter alla sidors respektive js filer med de funktioner sidan skulle ha.
Det var mycket laborerande med fetch-response för att få ut den information vi ville, och ännu mer pill för att få våran
frontend att presentera den information vi hämtade.

Nu har vi ett fullt fungerande RPS spel som vi alla är riktigt stolta över, och det har varit riktigt kul att bygga
detta från grunden.

### Reflektioner från arbetet.

Om jag ska sammanfatta hela projektet från början till slut så tycker jag att det mesta har gått riktigt bra.
Vi hade redan från början en ganska klar bild av hur vi ville att det skulle se ut och vilka funktioner vi ville ha med.
Några problem vi stötte på tidigt i projektet, redan under projektkunskap, var bland annat en brist på kompetens. Detta
visade sig främst när vi skulle lägga in våra Epics och tasks.
Här hade vi väldigt svårt att uppskatta hur lång tid saker och ting skulle ta samt att vi inte riktigt viste vad som
krävdes för att ro iland projektet.

När vi sedan gick över till Backend kursen och Spring Boot så vart saker och ting lite mer klara. Vi fick en kravspec.
med de funktioner som förväntades vara med i projektet och kunde utifrån det försöka fylla på med de komponenter vi
tyckte behövdes för att få det komplett.

Arbetet med vår backend rullade på riktigt bra, här hade vi ett bra samarbete och alla delar vi ville ha med såg vi till
att lägga in.

När vi efter backendkursen sadlade på HTML/CSS kursen så var vi alla riktigt taggade att äntligen få skapa "ansiktet" på
vårat spel. Här började vi med att dela upp arbetet så vi alla fick varsin sida att designa.
Vi kom överens om en gemensam Header och Footer som skulle följa med genom i princip hela flödeschemat och sen satte vi
alla igång att börja designa.
Detta upplägg gillade jag då det innebar att alla fick göra varsin design och alla fick utlopp för de tankar och idéer
som de hade.

För att sammanfatta vår HTML/CSS så är jag RIKTIGT nöjd med hur resultatet ser ut, vi har fått till ett riktigt snygg
design med precis det tema som vi hade tänkt oss.

Nu saknades bara Javscript för att koppla ihop dessa bitarna till ett komplett spel.

Här gick det lite långsamt i början då vi inte riktigt hade greppat hur vi skulle använda våra anrop för att manipulera
informationen i HTML filerna.
Jag satt mycket och googlade runt och lyckades hitta ett gäng fetch anrop skrivna till ett annat API, detta ledde till
att jag vi sidan om skapade ett litet testprojekt där man skulle lägga in information om bilar i ett web-gränssnitt som
sedan i sin tur skulle göra postanrop till en backend och spara detta i en databas.
Här satt jag och testade fram och tillbaka tills jag till slut lyckades spara en bil i databasen. Lyckan var total!

Efter detta så fick jag lite mer förståelse för hur en fetch fungerar och kunde då börja skriva logiken för hur vårat
spel skulle använda fetcharna.
Vi skrev ihop javascript filerna på ett par dagar, funktionstestade alla delar av spelet och har efter det bara gjort
lite småjusteringar här och där.

För att sammanfatta hela projektet så tycker jag att det har gått riktigt bra utifrån de förutsättningar vi har haft.
Det är alltid svårt att sätta sig in i något som man aldrig kommit i kontakt med tidigare, detta vart rätt tydligt när
vi till exempel skulle skriva anrop i spring boot. Vi hade ingen aning om hur detta skulle användas av vår frontend, så
det vart ju lite mer att följa instruktionen blindt.

Såhär i backspegeln så känner jag att det inte finns någonting vi hade kunnat göra annorlunda där och då. Nu besitter vi
betydligt mer kunskap än vad vi gjorde då så hade vi startat detta projekt idag så hade man självklart lagt upp vissa
saker annorlunda. Det kommer bli riktigt kul att skapa ett mobilanpassat spel av detta framöver.

### Beskrivning av design och tankar gällande användarvänlighet och interaktionsdesign.

Vi hade redan från början en ganska klar plan för hur vi ville att vårat spel skulle se ut.

Tanken var att ha ett väldigt "avskalat" spel där fokus alltid skulle ligga på själva spelet i sig, det skulle vara lätt
att navigera i menyerna och det skulle vara lätt att starta ett nytt spel mot dator eller annan användare.

Användaren ska i princip inte kunna göra fel!

Jag tycker att vi har skapat en väldigt enkel design i användarsyfte, det finns inga onödiga funktioner utan fokus
ligger på spelet i sig. Våra menyer är lättnavigerade och det framgår tydligt vad allt är.
Vi har sett till så att samtliga sidor går att "Tabba" sig igenom samt att det taben inte hoppar fram och tillbaka utan
tar linjära steg längs sidan.
alla våra knappar och menyer kan läsas upp av en text-till-tal funktion, vi har även med "Alt" på samtliga bilder så
dessa också kan läsas ut när det är dags att spela en spelomgång.

Samtliga sidor är responsiva och fungerar på allt ifrån en liten Iphone SE till en riktigt stor datormonitor.

Sammanfattningsvis så tycker jag att vi har fått med de vitala delarna för att göra vårat spel lättanvänt och
användarvänligt även för funktionsnedsatta.
Det positiva här är att RPS är väldigt simpelt redan från början, det behöver inte finnas 25 funktioner utan fokuset för
vår del var att skapa något lättanvänt och avskalat hellre än att ha en massa extrafunktioner.

Projektet har varit riktigt roligt och lärorikt, det ska bli spännande att fortsätta utvecklas!