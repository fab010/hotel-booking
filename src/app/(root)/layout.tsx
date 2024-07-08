import SearchBar from "@/components/search-bar";
import { SearchContextProvider } from "@/context/search-context";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SearchContextProvider>
            <div className="flex flex-col">
                <SearchBar />
                <main className="flex-1">{children}</main>
            </div>
        </SearchContextProvider>
    )
}
