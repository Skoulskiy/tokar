import { Head } from './Head/Head';
import Catalog from './Catalog/Catalog';
import ConstructionSecrets from './ConstructionSecrets/ConstructionSecrets';
import Leader from './Leader/Leader';
import Types from './Types/Types';
import News from './News/News';
import Footer from './Footer/Footer';

export const MainPage = ({language, setLanguage, openFailedModal}) => {
  return (
    <div>
        <Head language={language} setLanguage={setLanguage} openFailedModal={openFailedModal}/>
        <Catalog language={language} openFailedModal={openFailedModal}/>
        <ConstructionSecrets language={language} openFailedModal={openFailedModal}/>
        <Leader language={language} openFailedModal={openFailedModal}/>
        <Types language={language}/>
        <News language={language}/>
        <Footer language={language} openFailedModal={openFailedModal}/>
    </div>
  )
}
