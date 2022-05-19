import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../state/auth/authSlice';
import CardContainer from '../utils/CardContainer';

const Home = () => {
    const user = useSelector(selectLoggedInUser);

    return (
        <CardContainer>
            <h1 style={{ textAlign: 'center' }}>
                Welcome <span style={{color: 'rgb(25,118,210)'}}>{user !== null ? `${user.fullname}` : ''}</span> to the home page of the Task Manager!
            </h1>
            <h1>Feladatsorok alkalmazás</h1>
            <p>
                <em>Kliensoldali webprogramozás 2. beadandó</em>
            </p>
            <h2>Nyilatkozat</h2>
            <p>Kérlek, töltsétek ki az adataitokkal beadás előtt!</p>
            <p>
                &lt;Nuszpl Botond&gt; &lt;C40TKD&gt; Kliensoldali webprogramozás
                - beadandó Ezt <span>a</span> megoldást <span>a</span> fent írt
                hallgató küldte be és készítette <span>a</span> Kliensoldali
                webprogramozás kurzus számonkéréséhez. Kijelentem, hogy ez{' '}
                <span>a</span> megoldás <span>a</span> saját munkám. Nem
                másoltam vagy használtam harmadik féltől származó megoldásokat.
                Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem
                közzé. Az Eötvös Loránd Tudományegyetem Hallgató
                <span>i</span> Követelményrendszere (ELTE szervezeti és működési
                szabályzata, II. Kötet, <span>74</span>/C. §) kimondja, hogy
                mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy
                legalábbis annak jelentős részét - saját munkájaként mutatja be,
                az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb
                következménye <span>a</span> hallgató elbocsátása az egyetemről.
            </p>
            <h2>A feladat</h2>
            <p>
                A beadandóban olyan webes alkalmazást kell írnod, amelyben egy
                tanárnak lehetősége van egy feladatsort összeállítani, pl. óra
                vagy dolgozat céljából. A tanár létrehoz egy új feladatsort,
                majd a feladatbankban a feladatok között böngészve egy-egy
                feladatot hozzáad a szerkesztésre jelölt feladatsorhoz. A
                feladatok és a feladatsorok listázhatók, részleteik
                megtekinthetők, a feladatsorok szerkeszthetők.
            </p>
            <p>
                A feladatot <em>React</em> és <em>Redux</em> kombinációjával
                kell megoldanod, Redux esetében ajánlott a{' '}
                <em>redux toolkit</em> és akár az <em>RTK Query</em> használata.
                Mivel az alkalmazás több oldalból áll, a <em>react-router</em>{' '}
                használata javasolt. A feladatban adott a szerveroldali REST
                API, leírását lentebb olvashatjátok, ehhez kell igazodnia a
                kliensnek.
            </p>
            <h2>Oldalak</h2>
            <h3>Navigáció</h3>
            <p>
                Minden oldal tetején megjelenik egy navigációs sáv, ahol az
                alkalmazás neve, és az elérhető funkciók vannak menüpontokban
                megjelenítve:
            </p>
            <ul>
                <li>Alkalmazás neve: főoldalra visz</li>
                <li>Feladatbank</li>
                <li>
                    Ha nincs bejelentkezve
                    <ul>
                        <li>Regisztráció</li>
                        <li>Bejelentkezés</li>
                    </ul>
                </li>
                <li>
                    Bejelentkezve
                    <ul>
                        <li>Feladatsoraim</li>
                        <li>
                            Ha van szerkesztés alatt álló feladatsor, akkor
                            <ul>
                                <li>Szerkesztett feladatsor</li>
                            </ul>
                        </li>
                        <li>Profil</li>
                        <li>Kijelentkezés</li>
                    </ul>
                </li>
            </ul>
            <h3>Főoldal</h3>
            <p>
                Statikus információkat tartalmazó oldal, az alkalmazás címével
                és egy rövid leírással.
            </p>
            <h3>Feladatbank</h3>
            <p>
                A háttérrendszerben felvett adatok böngészése lehetséges itt. Az
                oldal 10 feladatot jelenít meg egyszerre, a feladatlistában
                előre-hátra lehet lapozni. Egy feladatnál a feladat címe, és a
                leírás egy rövid szelete jelenik meg. A feladatra kattintva
                ugyanezen az oldalon megjelenik a feladat teljes leírása (ez
                lehet egy accordion, egy lenyíló tartalom, vagy lehet az, hogy a
                feladatlista bal oldalon van a kiválasztott feladat jobb oldalon
                jelenik meg).
            </p>
            <ul>
                <li>
                    Ha a felhasználó be van jelentkezve,
                    <ul>
                        <li>
                            és a feladat még nincs kiválasztva,
                            <ul>
                                <li>
                                    akkor megjelenik egy &quot;Kiválaszt&quot;
                                    gomb, amire kattintva
                                    <ul>
                                        <li>
                                            ha nincs aktív feladatsor
                                            szerkesztés,
                                            <ul>
                                                <li>
                                                    akkor egy új feladatsor
                                                    szerkesztése kezdődik, és
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            a feladatot a feladatsorhoz adjuk;
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            ha a feladat már ki van választva
                            <ul>
                                <li>
                                    akkor csak jelezzük, hogy már
                                    &quot;Kiválasztva&quot;
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <h3>Regisztráció</h3>
            <p>Az alábbi adatok megadása szükséges:</p>
            <ul>
                <li>teljes név (kötelező)</li>
                <li>email cím (email, kötelező)</li>
                <li>jelszó (kötelező)</li>
            </ul>
            <p>Validáció elegendő HTML5 attribútumokkal!</p>
            <h3>Bejelentkezés</h3>
            <p>Az alábbi kötelező adatokkal történik:</p>
            <ul>
                <li>email (email. kötelező)</li>
                <li>jelszó (kötelező)</li>
            </ul>
            <p>Validáció elegendő HTML5 attribútumokkal!</p>
            <h3>Feladatsoraim</h3>
            <p>
                Csak bejelentkezve érhető el. A bejelentkezett felhasználóhoz
                tartozó feladatsorok jelennek itt meg, minden feladatsornál az
                alábbiak:
            </p>
            <ul>
                <li>feladatsor címe</li>
                <li>státusz (draft, published)</li>
                <li>leírás</li>
                <li>feladatok száma</li>
                <li>létrehozás és az utolsó módosítás dátuma</li>
            </ul>
            <p>
                Egy feladatsorra kattintva ugyanezen az oldalon (accordion, side
                panel) megjelenik a feladatsor:
            </p>
            <ul>
                <li>feladatsor címe</li>
                <li>státusz (draft, published)</li>
                <li>leírás</li>
                <li>létrehozás és az utolsó módosítás dátuma</li>
                <li>összpontszám (számított érték)</li>
                <li>
                    feladatok
                    <ul>
                        <li>feladat címe</li>
                        <li>feladat leírása</li>
                        <li>megjegyzés a feladathoz</li>
                        <li>pontszám</li>
                    </ul>
                </li>
                <li>
                    funkciók
                    <ul>
                        <li>
                            ha nincs szerkesztés alatt álló feladatsor,
                            <ul>
                                <li>
                                    akkor &quot;Szerkeszt&quot; gombra kattintva
                                    az adott feladat szerkesztésre jelölődik, és
                                    a <em>Szerkesztett feladatsor</em> oldalra
                                    kerülünk.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <p>
                Ezen az oldalon lehetőség van új feladatsor összeállítását
                kezdeményezni (&quot;Új feladatsor&quot; gomb), ekkor a{' '}
                <em>Szerkesztett feladatsor</em> oldalra kerülünk.
            </p>
            <h3>Szerkesztett feladatsor</h3>
            <p>
                Csak bejelentkezve érhető el, és ha van új vagy meglévő
                feladatsor szerkesztésre jelölve.
            </p>
            <ul>
                <li>feladatsor címe (szerkeszthető, kötelező)</li>
                <li>
                    státusz (szerkeszthető, kötelező, értékei: draft, published)
                </li>
                <li>leírás (szerkeszthető)</li>
                <li>létrehozás és az utolsó módosítás dátuma</li>
                <li>összpontszám (számított érték)</li>
                <li>
                    feladatok
                    <ul>
                        <li>feladat címe</li>
                        <li>feladat leírása</li>
                        <li>megjegyzés a feladathoz (szerkeszthető)</li>
                        <li>pontszám (szerkeszthető)</li>
                    </ul>
                </li>
                <li>
                    funkciók
                    <ul>
                        <li>
                            &quot;Mentés&quot;: a feladatsor mentése (új vagy
                            módosítás)
                        </li>
                        <li>
                            &quot;Szerkesztés lezárása&quot;: szerkesztés
                            lezárása, visszatérés a <em>Feladatsoraim</em>{' '}
                            oldalra
                        </li>
                    </ul>
                </li>
            </ul>
            <h3>Profil</h3>
            <p>
                Csak bejelentkezve érhető el. A bejelentkezett felhasználó
                adatai jelennek meg.
            </p>
            <ul>
                <li>Név</li>
                <li>Email</li>
                <li>Feladatsorok száma</li>
                <li>Kijelentkezés gomb</li>
            </ul>
            <h2>A kliens</h2>
            <p>
                Az alkalmazást a <code>client</code> mappában kell elkészíteni.
                A mappa egyelőre egy teljesen friss Create-React-App telepítést
                tartalmaz, a szükséges további függőségeket Nektek kell
                hozzáadni. A nem szükséges dolgokat viszont nyugodtan ki is
                törölheted!
            </p>
            <pre>
                <code>
                    cd client
                    <span>npm</span> install
                    <span>npm</span> start
                </code>
            </pre>
            <h2>REST API</h2>
            <p>
                A szerver forráskódja a <code>rest-api</code> mappában
                található. Telepíteni és indítani kell lokálisan:
            </p>
            <pre>
                <code>
                    cd rest-api
                    <span>npm</span> install
                    <span>npm</span> start
                </code>
            </pre>
            <p>Három szolgáltatás van kivezetve:</p>
            <ul>
                <li>
                    <code>users</code>
                </li>
                <li>
                    <code>tasks</code>
                </li>
                <li>
                    <code>tasklists</code>
                </li>
            </ul>
            <p>
                A végpontok leírását és kipróbálását úgy tehetitek meg
                legegyszerűbben, ha az alábbi Postman gyűjteményeket
                importáljátok a Postman REST API kliensbe. Ez egy webes
                alkalmazás, a Postman Agentet lokálisan telepíteni kell, majd a
                megnyíló alkalmazásban egy új Workspace-t kell létrehozni, és
                fent megnyomni az &quot;Import&quot; gombot, és egyesével
                linkként beilleszteni őket:
            </p>
            <ul>
                <li>
                    <a href="https://www.postman.com/collections/71406ec35bdc64e61081">
                        auth gyűjtemény
                    </a>
                </li>
                <li>
                    <a href="https://www.postman.com/collections/f494799129c38052c21e">
                        tasks gyűjtemény
                    </a>
                </li>
                <li>
                    <a href="https://www.postman.com/collections/c2b1e7c90aaf8c36f415">
                        tasklists gyűjtemény
                    </a>
                </li>
            </ul>
            <p>
                Innentől kipróbálhatók a végpontok. A felküldendő tartalmak a
                Body részben vannak előkészítve. Az authentikációhoz tartozó JWT
                token a <code>tasklists</code> gyűjtemény{' '}
                <code>Authorization</code> fülén van elmentve, ott igény szerint
                cserélhető.
            </p>
            <h2>Adatbázis</h2>
            <p>
                A mentett adatok egy lokális SQLite táblában jelennek meg:{' '}
                <code>feladatsor_restapi.sqlite</code>. Ezt pl. a{' '}
                <a href="https://sqlitebrowser.org/">DB Browser for SQLite</a>{' '}
                programmal tudunk megnézni, módosítani.
            </p>
            <h2>További információk</h2>
            <p>
                Elvárás az igényes megjelenés. Ehhez használhatsz saját CSS-t
                is, de komponens függvénykönyvárakat is, mint pl.{' '}
                <a href="https://mui.com/">Material UI</a> vagy{' '}
                <a href="https://react-bootstrap.github.io/">Bootstrap</a>.
            </p>
            <h2>Feltöltendő</h2>
            <p>
                Az egész projektet tömörítsd be, kliensestül, szerverestül, és
                azt töltsd föl.{' '}
                <strong>
                    Beadás (tömörítés) előtt a <code>node_modules</code>{' '}
                    mappákat mindenképpen töröld!
                </strong>
            </p>
            <h2>Pontozás</h2>
            <p>Összesen 30 pont érhető el.</p>
            <ul>
                <li>[ ] React használata (kötelező)</li>
                <li>[ ] Redux használata (kötelező)</li>
                <li>
                [ ] Navigáció megfelelően változik a be- és kijelentkezésnek
                    megfelelően (1pt)
                </li>
                <li>[ ] Főoldal megjelenik (1pt)</li>
                <li>
                [ ] Feladatbank: megjelennek a feladatok a megfelelő tartalommal
                    (1pt)
                </li>
                <li>
                [ ] Feladatbank: 10 feladat jelenik meg, előre-hátra lapozással
                    (2pt)
                </li>
                <li>
                [ ] Feladatbank: feladatra kattintva megjelenik a feladat
                    leírása (2pt)
                </li>
                <li>
                [ ] Feladatbank: bejelentkezett felhasználónál ha a feladat
                    nincs kiválasztva, akkor megjelenik a &quot;Kiválaszt&quot;
                    gomb (1pt)
                </li>
                <li>
                [ ] Feladatbank: bejelentkezett felhasználónál ha a feladat már
                    ki van választva, akkor megjelenik a &quot;Kiválasztva&quot;
                    felirat (1pt)
                </li>
                <li>
                [ ] Feladatbank: &quot;Kiválaszt&quot; gomb helyes működése
                    (2pt)
                </li>
                <li>[ ] Regisztráció működik (1pt)</li>
                <li>[ ] Bejelentkezés működik (1pt)</li>
                <li>[ ] Feladatsoraim: csak bejelentkezve érhető el (1pt)</li>
                <li>
                [ ] Feladatsoraim: a felhasználóhoz tartozó feladatsorok
                    megjelennek (1pt)
                </li>
                <li>
                [ ] Feladatsoraim: feladatsorra kattintva a feladatsor részletei
                    megjelennek (1pt)
                </li>
                <li>
                [ ] Feladatsoraim: &quot;Szerkeszt&quot; gomb helyes működése
                    (1pt)
                </li>
                <li>
                [ ] Feladatsoraim: &quot;Új feladatsor&quot; gomb helyes
                    működése (1pt)
                </li>
                <li>
                [ ] Szerkesztett feladatsor: csak bejelentkezve érhető el és ha
                    van szerkesztésre jelölt feladatsor (1pt)
                </li>
                <li>
                [ ] Szerkesztett feladatsor: a megjelenített adatok megfelelőek
                    (1pt)
                </li>
                <li>
                [ ] Szerkesztett feladatsor: a jelölt adatok szerkeszthetők
                    (2pt)
                </li>
                <li>
                [ ] Szerkesztett feladatsor: &quot;Mentés&quot; gomb helyes
                    működése (2pt)
                </li>
                <li>
                [ ] Szerkesztett feladatsor: &quot;Szerkesztés lezárása&quot;
                    gomb helyes működése (2pt)
                </li>
                <li>
                    [ ] Profil: csak bejelentkezve érhető el, megfelelő tartalommal
                    (1pt)
                </li>
                <li>[ ] Profil: Kijelentkezés gomb működik (1pt)</li>
                <li>[ ] Igényes megjelenés (2pt)</li>
                <li>[ ] 1 hét késés (-3pt)</li>
                <li>[ ] 2 hét késés (-6pt)</li>
            </ul>
        </CardContainer>
    );
};

export default Home;
