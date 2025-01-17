import React from 'react'
import Modal from 'react-bootstrap/Modal'

const TermsOfService = ({ show, handleHide }) => {

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Body>
                <div className="terms-of-service">
                    <h2>Пользовательское соглашение</h2>

                    <section>
                        <h3>1. Общие положения</h3>
                        <p>
                            1.1. Настоящее Пользовательское соглашение (далее – Соглашение) регулирует
                            отношения между [Название сервиса] (далее – Сервис), и физическим
                            лицом (далее – Пользователь), возникающие в связи с использованием
                            Сервиса.
                        </p>
                        <p>
                            1.2. Сервис – это информационный ресурс, предоставляющий доступ к различным
                            видам познавательного контента (далее – Контент).
                        </p>
                        <p>
                            1.3. Пользователь – это любое физическое лицо, зарегистрированное на
                            Сервисе и использующее его ресурсы.
                        </p>
                        <p>
                            1.4. Начиная использовать Сервис, Пользователь подтверждает, что
                            ознакомился с условиями настоящего Соглашения, понимает их смысл и
                            соглашается с ними в полном объеме. Использование Сервиса означает
                            безоговорочное согласие с условиями настоящего Соглашения.
                        </p>
                        <p>
                            1.5. Администрация Сервиса оставляет за собой право в любое время вносить
                            изменения в настоящее Соглашение. Новая редакция Соглашения вступает в
                            силу с момента ее публикации на Сервисе. Пользователь обязуется
                            самостоятельно отслеживать изменения в Соглашении.
                        </p>
                    </section>

                    <section>
                        <h3>2. Регистрация и учетная запись</h3>
                        <p>
                            2.1. Для использования Сервиса Пользователь должен пройти процедуру
                            регистрации, указав действующий адрес электронной почты, номер
                            телефона, имя, фамилию, фото профиля (по желанию) и придумать надежный
                            пароль.
                        </p>
                        <p>
                            2.2. Пользователь несет ответственность за сохранность своего пароля и за
                            все действия, совершенные под его учетной записью.
                        </p>
                        <p>
                            2.3. Пользователь обязуется незамедлительно уведомить Администрацию
                            Сервиса о любом несанкционированном доступе к его учетной записи.
                        </p>
                        <p>
                            2.4. Администрация Сервиса имеет право заблокировать или удалить учетную
                            запись Пользователя в случае нарушения им условий настоящего
                            Соглашения.
                        </p>
                    </section>

                    <section>
                        <h3>3. Персональные данные</h3>
                        <p>
                            3.1. Сервис собирает и хранит следующие персональные данные
                            Пользователя: адрес электронной почты, номер телефона, фамилию, имя,
                            фото профиля (по желанию) и пароль.
                        </p>
                        <p>
                            3.2. Персональные данные Пользователя обрабатываются в соответствии с [
                            Законодательство о защите персональных данных страны, где
                            зарегистрирован сервис].
                        </p>
                        <p>
                            3.3. Сервис обязуется использовать персональные данные Пользователя только
                            для целей, указанных в настоящем Соглашении, а именно:
                        </p>
                        <ul>
                            <li>Предоставление доступа к Контенту.</li>
                            <li>Идентификация Пользователя.</li>
                            <li>Обеспечение технической поддержки.</li>
                            <li>Улучшение качества Сервиса.</li>
                            <li>Информирование Пользователя об изменениях и обновлениях Сервиса,
                                акциях.</li>
                        </ul>
                        <p>
                            3.4. Сервис не передает персональные данные Пользователя третьим лицам,
                            за исключением случаев, предусмотренных законодательством.
                        </p>
                        <p>
                            3.5. Пользователь имеет право запросить доступ к своим персональным
                            данным, их исправление или удаление, а также отозвать согласие на их
                            обработку. Для этого необходимо обратиться в службу поддержки Сервиса.
                        </p>
                    </section>

                    <section>
                        <h3>4. Подписка и доступ к Контенту</h3>
                        <p>
                            4.1. Сервис предоставляет доступ к Контенту на платной основе путем
                            оформления подписки.
                        </p>
                        <p>
                            4.2. Пользователь может выбрать один из двух видов подписки:
                        </p>
                        <ul>
                            <li>
                                <strong>Standard:</strong> Предоставляет доступ к базовому набору
                                Контента.
                            </li>
                            <li>
                                <strong>Premium:</strong> Предоставляет доступ к расширенному набору
                                Контента и дополнительным функциям.
                            </li>
                        </ul>
                        <p>
                            4.3. Стоимость подписки устанавливается Администрацией Сервиса и
                            публикуется на Сервисе.
                        </p>
                        <p>
                            4.4. Подписка является автоматически продлеваемой, если не будет
                            отменена Пользователем до окончания текущего периода.
                        </p>
                        <p>
                            4.5. Сервис не несет ответственности за недоступность Контента в случае
                            технических сбоев или других обстоятельств, не зависящих от Сервиса.
                        </p>
                    </section>

                    <section>
                        <h3>5. Права и обязанности Пользователя</h3>
                        <p>5.1. Пользователь имеет право:</p>
                        <ul>
                            <li>
                                Получать доступ к Контенту в соответствии с выбранным видом подписки.
                            </li>
                            <li>
                                Обращаться в службу поддержки Сервиса по вопросам, связанным с его
                                использованием.
                            </li>
                            <li>Запрашивать изменение или удаление своих персональных данных.</li>
                        </ul>
                        <p>5.2. Пользователь обязан:</p>
                        <ul>
                            <li>Соблюдать условия настоящего Соглашения.</li>
                            <li>Не передавать свой пароль третьим лицам.</li>
                            <li>
                                Не распространять Контент, доступ к которому предоставлен только в
                                рамках подписки, третьим лицам.
                            </li>
                            <li>Не использовать Сервис для противоправных целей.</li>
                            <li>
                                Не нарушать права интеллектуальной собственности Сервиса и третьих
                                лиц.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3>6. Права и обязанности Сервиса</h3>
                        <p>6.1. Сервис имеет право:</p>
                        <ul>
                            <li>Вносить изменения в Соглашение.</li>
                            <li>Изменять Контент и функциональность Сервиса.</li>
                            <li>
                                Блокировать или удалять учетные записи Пользователей, нарушивших
                                условия Соглашения.
                            </li>
                            <li>
                                Прекращать работу Сервиса в случае технических неполадок или
                                проведения технических работ.
                            </li>
                            <li>Собирать и обрабатывать персональные данные Пользователя в соответствии с Соглашением и законодательством.</li>
                        </ul>
                        <p>6.2. Сервис обязан:</p>
                        <ul>
                            <li>
                                Обеспечивать доступ к Контенту в соответствии с выбранным видом
                                подписки.
                            </li>
                            <li>Принимать меры по защите персональных данных Пользователя.</li>
                            <li>
                                Своевременно информировать Пользователей о важных изменениях в работе
                                Сервиса.
                            </li>
                            <li>
                                Обеспечивать техническую поддержку Пользователей.
                            </li>
                        </ul>
                    </section>


                    <section>
                        <h3>7. Ответственность</h3>
                        <p>7.1. Сервис не несет ответственности за:</p>
                        <ul>
                            <li>Недоступность Сервиса по техническим причинам, не зависящим от Сервиса.</li>
                            <li>Неправильное использование Сервиса Пользователем.</li>
                            <li>Содержание Контента, предоставленного третьими лицами.</li>
                            <li>Убытки, понесенные Пользователем в результате использования Сервиса.</li>
                            <li>За достоверность и точность информации предоставленной на сервисе. Пользователь принимает на себя ответственность за ее использование.</li>
                        </ul>
                        <p>7.2. Пользователь несет ответственность за:</p>
                        <ul>
                            <li>Сохранность своего пароля.</li>
                            <li>Нарушение условий Соглашения.</li>
                            <li>Нарушение прав интеллектуальной собственности Сервиса и третьих лиц.</li>
                        </ul>

                    </section>

                    <section>
                        <h3>8. Интеллектуальная собственность</h3>
                        <p>
                            8.1. Все права на Контент, предоставляемый Сервисом, принадлежат [Название
                            сервиса] или их законным владельцам.
                        </p>
                        <p>
                            8.2. Пользователь не имеет права копировать, распространять, модифицировать или иным образом использовать Контент без письменного согласия [Название сервиса].
                        </p>
                    </section>
                    <section>
                        <h3>9. Заключительные положения</h3>
                        <p>
                            9.1. Настоящее Соглашение регулируется законодательством [Страна, где
                            зарегистрирован сервис].
                        </p>
                        <p>
                            9.2. Все споры, возникающие в связи с использованием Сервиса,
                            разрешаются путем переговоров, а в случае невозможности достичь
                            согласия - в судебном порядке по месту нахождения Администрации
                            Сервиса.
                        </p>
                        <p>
                            9.3. Если какой-либо пункт настоящего Соглашения будет признан
                            недействительным, это не влияет на действительность остальных пунктов.
                        </p>
                        <p>
                            9.4. Связь с администрацией Сервиса осуществляется по электронной почте: [адрес электронной почты службы поддержки].
                        </p>

                    </section>
                    <p>
                        <strong>Дата последней редакции:</strong> 16.01.2024
                    </p>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="prime-btn" onClick={e => handleHide()}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TermsOfService