import { apiService } from "./ApiService";
import { eventService } from "./EventService";
import patientModel from "../model/PatientModel.json";

export const createPatientTwins = async (patients) => {
    for (let patient of patients) {
        try {
            apiService.addTwin(patient.PATIENTID, generateTwinPayload(patient));
            eventService.publishCreateTwin({ $dtId: patient.PATIENTID, $metadata: { $model: patientModel["@id"] }, patientLabel: patient.label });
            eventService.publishSelection();
        }
        catch (exc) {
            exc.customMessage = "Error in instance creation";
            eventService.publishError(exc);
        }
    }
}


const generateTwinPayload = (patient) => {
    let payload = {
        $metadata: {
            $model: patientModel["@id"]
        },
        PATIENTID: patient.PATIENTID,
        HEIGHT: patient.HEIGHT ? parseFloat(patient.HEIGHT) : 0,
        WEIGHT: patient.WEIGHT ? parseFloat(patient.WEIGHT) : 0,
        OPERATIONNAME: patient.OPERATIONNAME ? patient.OPERATIONNAME : "",
        OPTYPE: patient.OPTYPE ? parseFloat(patient.OPTYPE) : 0,
        OPGRADE: patient.OPGRADE ? parseInt(patient.OPGRADE) : 0,
        AFTERCLIC: patient.AFTERCLIC ? patient.AFTERCLIC : "",
        ANESWAY: patient.ANESWAY ? parseFloat(patient.ANESWAY) : 0,
        ANESMINUTE: patient.ANESMINUTE ? parseFloat(patient.ANESMINUTE) : 0,
        OPMINUTE: patient.OPMINUTE ? parseFloat(patient.OPMINUTE) : 0,
        EMERGENCY_INDICATOR: patient.EMERGENCY_INDICATOR ? parseFloat(patient.EMERGENCY_INDICATOR) : 0,
        label: patient.label ? patient.label : "",
        BLOOD_LOSSED: patient.BLOOD_LOSSED ? parseFloat(patient.BLOOD_LOSSED) : 0,
        OUT_FLUIDS_AMOUNT: patient.OUT_FLUIDS_AMOUNT ? parseFloat(patient.OUT_FLUIDS_AMOUNT) : 0,
        recipe: patient.recipe ? parseFloat(patient.recipe) : 0,
        SufentanilConcentration: patient.SufentanilConcentration ? parseFloat(patient.SufentanilConcentration) : 0,
        TramadolConcentration: patient.TramadolConcentration ? parseFloat(patient.TramadolConcentration) : 0,
        ButofinoConcentration: patient.ButofinoConcentration ? parseFloat(patient.ButofinoConcentration) : 0,
        DizocineConcentration: patient.DizocineConcentration ? parseFloat(patient.DizocineConcentration) : 0,
        Ibenin: patient.Ibenin ? parseFloat(patient.Ibenin) : 0,
        Sevoflurane: patient.Sevoflurane ? parseFloat(patient.Sevoflurane) : 0,
        xinlv_URGENT_FLAG: patient.xinlv_URGENT_FLAG ? parseFloat(patient.xinlv_URGENT_FLAG) : 0,
        final_label: patient.final_label ? parseFloat(patient.final_label) : 0,
        complete: patient.complete ? parseFloat(patient.complete) : 0,
        YN: patient.YN ? parseInt(patient.YN) : 0,
    };

    return payload;
}