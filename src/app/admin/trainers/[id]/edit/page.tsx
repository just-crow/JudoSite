import { getTrainer } from "@/actions/trainers";
import { notFound } from "next/navigation";
import EditTrainerForm from "@/components/EditTrainerForm";

export default async function EditTrainerPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const trainer = await getTrainer(params.id);

    if (!trainer) {
        notFound();
    }

    return <EditTrainerForm trainer={trainer} trainerId={params.id} />;
}
