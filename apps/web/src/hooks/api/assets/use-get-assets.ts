import { useQuery } from "@tanstack/react-query"
import { env } from "../../../env"

export const useGetUserAssets = (withObligations: string) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['assets', withObligations],
        queryFn: () =>
            fetch(`${env.VITE_API_URL}/assets?withObligations=${withObligations}`).then((res) =>
            res.json(),
        ),
    })
    return { isPendingUserAssets: isPending, userAssetsData: data }
}