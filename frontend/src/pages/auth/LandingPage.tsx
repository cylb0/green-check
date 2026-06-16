import PlantScannerIcon from "../../components/landing-page/PlantScannerIcon";
import DotAuthNav from "../../components/auth/DotAuthNav";

export default function LandingPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <PlantScannerIcon />
            <h1 className="text-center text-heading">Plant disease<br/>Detection</h1>
            <span className="text-center text-subheading mt-4">Take care of your plants,<br/> nature will thank you</span>
            <DotAuthNav />
        </div>
    )
}
