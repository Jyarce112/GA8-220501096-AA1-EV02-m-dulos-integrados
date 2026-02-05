import React, { useState } from 'react';

const tabs = [
  { id: 'faq', label: 'Preguntas Frecuentes' },
  { id: 'shipping', label: 'Políticas de Envío' },
  { id: 'returns', label: 'Devoluciones' },
  { id: 'terms', label: 'Términos y Condiciones' },
  { id: 'privacy', label: 'Aviso de Privacidad' },
];

const content = {
  faq: (
    <>
      <h3>Preguntas Frecuentes</h3>
      <p><strong>¿Cómo puedo realizar un pedido?</strong><br />
      Puedes realizar tu pedido a través de nuestra página web agregando productos al carrito y siguiendo el proceso de checkout.</p>

      <p><strong>¿Cuáles son los métodos de pago disponibles?</strong><br />
      Aceptamos tarjetas de crédito, débito, PSE y pagos contra entrega en algunas zonas.</p>

      <p><strong>¿Hacen entregas a domicilio?</strong><br />
      Sí, realizamos entregas en toda la ciudad. Los tiempos de entrega varían según la zona.</p>

      <p><strong>¿Puedo devolver un producto?</strong><br />
      Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en perfectas condiciones.</p>

      <p><strong>¿Ofrecen garantía en los productos?</strong><br />
      Todos nuestros productos cuentan con garantía del fabricante. Los términos varían según el producto.</p>
    </>
  ),
  shipping: (
    <>
      <h3>Políticas de Envío</h3>
      <p>Realizamos envíos a todo el país con diferentes opciones de transporte. Los costos y tiempos dependen de la ubicación y el tipo de envío seleccionado.</p>
      <ul>
        <li>Envío estándar: 3-7 días hábiles.</li>
        <li>Envío exprés: 1-2 días hábiles.</li>
        <li>Seguimiento en línea disponible para todos los envíos.</li>
      </ul>
    </>
  ),
  returns: (
    <>
      <h3>Devoluciones</h3>
      <p>Si no estás satisfecho con tu compra, puedes solicitar una devolución dentro de los 30 días posteriores a la recepción del producto.</p>
      <ul>
        <li>El producto debe estar en condiciones originales y sin uso.</li>
        <li>El proceso de devolución debe ser aprobado por nuestro equipo de soporte.</li>
        <li>Los costos de envío de la devolución pueden ser asumidos por el cliente, salvo en casos de productos defectuosos.</li>
      </ul>
    </>
  ),
  terms: (
    <>
      <h3>Términos y Condiciones</h3>
      <p>Al utilizar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones:</p>
      <ul>
        <li>Los precios y disponibilidad están sujetos a cambios sin previo aviso.</li>
        <li>Nos reservamos el derecho de cancelar pedidos en caso de fraude o errores.</li>
        <li>El uso del sitio es bajo tu propio riesgo.</li>
      </ul>
    </>
  ),
  privacy: (
    <>
      <h3>Aviso de Privacidad</h3>
      <p>Nos comprometemos a proteger tu privacidad y datos personales. La información que recopilemos será utilizada únicamente para procesar pedidos y mejorar nuestros servicios.</p>
      <ul>
        <li>No compartimos tu información con terceros sin tu consentimiento.</li>
        <li>Utilizamos medidas de seguridad para proteger tus datos.</li>
        <li>Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento.</li>
      </ul>
    </>
  ),
};

function Policies() {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <section className="policies-section" style={{ maxWidth: 900, margin: '40px auto', padding: 25, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c5aa0', textAlign: 'center', marginBottom: 30 }}>Políticas y Soporte</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 30 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? '#2c5aa0' : '#e9ecef',
              color: activeTab === tab.id ? 'white' : '#2c5aa0',
              border: '1.5px solid #2c5aa0',
              padding: '10px 22px',
              borderRadius: 12,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              boxShadow: activeTab === tab.id ? '0 6px 16px rgba(44, 90, 160, 0.5)' : 'none',
              transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 12,
        color: '#343a40',
        fontSize: '1.125rem',
        lineHeight: 1.6,
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.65)',
        minHeight: 150,
        outline: 'none',
        transition: 'background-color 0.3s ease',
      }}>
        {content[activeTab]}
      </div>
    </section>
  );
}

export default Policies;