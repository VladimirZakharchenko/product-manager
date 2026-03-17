export const AddProductModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h3 className="text-xl font-bold mb-4">Добавить новый товар</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm mb-1">Наименование</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Название товара" />
          </div>
          <div>
            <label className="block text-sm mb-1">Цена</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Вендор</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Артикул</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Отмена</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Сохранить</button>
        </div>
      </div>
    </div>
  );
};