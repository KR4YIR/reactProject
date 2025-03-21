import { Translate, Modify } from "ol/interaction";
import { getMap } from "../initMap";
import { updateFeature } from "../redux/objectSlice";
import { vectorSource } from "../initMap";
import { Collection } from "ol";
import WKT from "ol/format/WKT";
import { toast } from "react-toastify";

export const enableTranslateMode = (selectedFeatureJSON, dispatch, getUserConfirmation) => {
    const map = getMap();
    // Mevcut feature'ı vectorSource'tan bul
    const selectedFeature = vectorSource.getFeatures().find(feature => {
        return feature.getId() === selectedFeatureJSON.id;
    });

    if (!selectedFeature) {
        console.error("Seçilen özellik vectorSource'ta bulunamadı.");
        return;
    }

    // Başlangıç konumunu kaydet
    const initialGeometry = selectedFeature.getGeometry().clone(); // İlk geometriyi klonlayarak kaydediyoruz

    // Sadece bu feature üzerinde Translate işlemini etkinleştir
    const translate = new Translate({
        features: new Collection([selectedFeature]) // Mevcut özelliği hedefliyoruz
    });

    translate.on('translateend', async (event) => {
        const feature = event.features.item(0); // Taşınan özellik
        const geometry = feature.getGeometry();

        // Koordinatları dönüştür
        const transformedGeometry = geometry.clone().transform('EPSG:3857', 'EPSG:4326');

        // WKT formatına dönüştür
        const wktFormat = new WKT();
        const wkt = wktFormat.writeGeometry(transformedGeometry);

        // Kullanıcı confirm işlemini reddederse eski konuma dön
        const userConfirmed = await getUserConfirmation();
        if (!userConfirmed) {
            selectedFeature.setGeometry(initialGeometry);
            
            toast.warning("Update operation is cancelled!");
            
        } else {
            const data = {
                name: selectedFeatureJSON.name,
                wkt: wkt
            };
            dispatch(updateFeature({
                id: selectedFeatureJSON.id,
                data: data
            }));
            
            toast.success("Feature updated successfully!");

        }
        map.removeInteraction(translate); // İşlem tamamlandığında etkileşimi kaldır
    });
    map.addInteraction(translate); // Translate işlemini haritaya ekle
};


