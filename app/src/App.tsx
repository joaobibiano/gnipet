import { LanguageSwitcher } from "./components/LanguageSwitcher";
import TemplateListContainer from "./components/TemplateListContainer";
import { TemplateContextProvider } from "./context/TemplateContext";

function App() {
  return (
    <TemplateContextProvider>
      <div className="p-4 min-h-screen rounded-lg shadow-sm">
        <header className="flex justify-end">
          <LanguageSwitcher />
        </header>
        <TemplateListContainer />
      </div>
    </TemplateContextProvider>
  );
}

export default App;
