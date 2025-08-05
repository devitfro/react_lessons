import { useActionState, useEffect } from 'react';
import './AsyncForm.css'

function AsyncForm() {
    const [state, formAction, isPending] = useActionState( // инициализация состояния, обработчика формы и индикатора загрузки через хук useActionState
    async (_prevState, formData) => { // асинхронная функция, получающая предыдущее состояние и данные формы
        try { 
            const name = formData.get('name'); // получение значения поля "name" из formData
            const email = formData.get('email'); // получение значения поля "email" из formData
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }), // преобразование данных формы в JSON-строку
            });
            const data = await response.json(); // ожидание и парсинг ответа от сервера в формате JSON
            console.log('Ответ от API:', data); 
            return { success: true, data }; // возврат успешного результата с данными
        } catch (error) {
            console.error('Ошибка API:', error); 
            return { success: false, error: error.message };
        }
    },
    null // начальное состояние, передаваемое в useActionState
);

    useEffect(() => {
        if (state) {
            console.log('Состояние формы:', state);
        }
    }, [state]);

    return (
        <div className="async-form-container">
            <form className="async-form" action={formAction}>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input id="name" type="text" name="name" disabled={isPending} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" disabled={isPending} />
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Отправка...' : 'Отправить'}
                </button>
            </form>
            {state && (
                <div className="result-container">
                    <p className={state.success ? 'success' : 'error'}>
                        Результат: {state.success ? 'Успешно!' : `Ошибка: ${state.error}`}
                    </p>
                    {state.success && (
                        <pre>{JSON.stringify(state.data, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
}

export default AsyncForm;