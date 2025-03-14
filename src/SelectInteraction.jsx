import SelectInteraction from 'ol/interaction/Select';

function Select(map) {
  // Ol interaction select oluştur
  const select = new SelectInteraction();
  map.addInteraction(select);

  // Seçim olaylarını dinle
  select.on('select', (e) => {
    if (e.selected.length > 0) {
      const selectedFeature = e.selected[0];
      console.log('Selected feature:', selectedFeature);
    } else {
      console.log('No features selected.');
    }
  });

  return select;
}

export default Select;
