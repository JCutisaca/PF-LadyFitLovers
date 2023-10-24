import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, Box, Avatar } from "@mui/material";
import "./chatBot.css"
import { useSelector } from "react-redux";

const ChatBot = () => {
  const user = useSelector((state)=> state.user)
  const [inputText, setInputText] = useState("")
  // console.log(user);
  const [messages, setMessages] = useState([
    {text:   <div>
             ¡Hola {user?.name}! Soy LadyBot🤖, tu asistente virtual. ¿En qué puedo ayudarte hoy? Aquí hay algunas opciones que podrías probar: <br/>
            - <strong>Teléfono: </strong> Para obtener nuestro número de teléfono <br/> 
            - <strong>Envíos:</strong> Para información sobre envíos y entrega. <br/> 
            - <strong>Productos disponibles:</strong> Para conocer nuestra gama de productos.<br/> 
            - <strong>Cómo realizar un pedido:</strong> Para obtener instrucciones sobre cómo comprar.<br/> 
            - <strong>Métodos de pago:</strong> Para conocer los métodos de pago aceptados.<br/> 
            - <strong>Tallas y guía de tallas:</strong> Para obtener información sobre tallas de productos.<br/> 
            - <strong>Necesito información sobre el stock:</strong> Para verificar la disponibilidad de un producto específico.<br/> 
            - <strong>Necesito la dirección del local:</strong> Para conocer nuestra dirección física.<br/> 
            ¿En qué más puedo ayudarte?"
              </div>,
              isUser:false }

  ]);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = ( array ) => {
    // console.log(newMesagge);
    setMessages([...messages, ...array]);
    // return newMesagge
  };

  const handleUserMessage = (message) => {
    if (message.trim() !== "") {
      
      
      let botResponse = ""
      switch (message.toLowerCase()) {
        case "telefono":
          case "télefono":
            case "Télefono":
              case "Telefono":
                botResponse = <div>Nuestro número de teléfono es 123-456-789.<br/> ¿Puedo ayudarte en algo mas?</div>
                
                break;
            break;
            case "envíos":
              case "envios":
                case "Envios":
                  case "Envíos":
                    botResponse = <div>Realizamos envíos a todo el país. Al realizar la compra debe elegir tu provincia <br/>¿Puedo ayudarte en algo mas?</div>
                    break;
                    case "necesito información sobre el stock":
                      case "Necesito información sobre el stock":
                        case "Necesito informacion sobre el stock":
                          case "necesito informacion sobre el stock":
                            botResponse = "Todos los productos publicados cuentan con stock disponible, en caso de no tener stock no vas a poder acceder al producto."
                            break;
                            case "Necesito la dirección del local":
                              case "necesito la dirección del local":
                                case "Necesito la direccion del local":
                                  case "necesito la direccion del local":
                                    botResponse = "Estamos ubicados en la Calle Principal 123, Ciudad. ¡Te esperamos! ¿Hay algo más en lo que pueda ayudarte?"
                                    break;
                                    case "productos disponibles":
                                      case "Productos disponibles":
            botResponse = <div>Tenemos una amplia gama de productos disponibles, incluyendo remeras, calzas, shorts, vestidos y bikinis. Están disponibles en diferentes tallas y colores, tanto cortos como largos.<br/> ¿Puedo ayudarte en algo mas?</div>
            break;
        case "cómo realizar un pedido":
        case "Cómo realizar un pedido":
        case "Como realizar un pedido":
          case "como realizar un pedido":
            botResponse = <div>Para realizar un pedido, simplemente selecciona los productos que te interesan y agrégales al carrito. Luego, sigue los pasos para completar tu compra, incluyendo tu información de envío y pago.<br/> ¿Puedo ayudarte en algo mas?</div>
            break;
            case "métodos de pago":
              case "Métodos de pago":
                case "metodos de pago":
                  case "Metodos de pago":
                    botResponse = <div>Aceptamos varios métodos de pago, incluyendo tarjetas de crédito, débito y mercado pago. Puedes elegir el método de pago que sea más conveniente para ti durante el proceso de compra.<br/> ¿Puedo ayudarte en algo mas?</div>
                    break; 
                    break;
                    case "tallas y guía de tallas":
                      case "Tallas y guía de tallas":
                        case "tallas y guia de tallas":
                          case "Tallas y guia de tallas":
                            botResponse = <div>Nuestros productos están disponibles en una variedad de tallas, desde XS hasta XXL. También ofrecemos una guía de tallas en nuestro sitio web para ayudarte a elegir el tamaño adecuado.<br/> ¿Puedo ayudarte en algo mas?</div>
                            break; 
                            break;
                    case "si":
                    case "Si":
                      botResponse = 
                      <div>
                      Dime en que mas puedo ayudarte <br/>
                     - <strong>Teléfono: </strong> Para obtener nuestro número de teléfono <br/> 
                     - <strong>Envíos:</strong> Para información sobre envíos y entrega. <br/> 
                     - <strong>Productos disponibles:</strong> Para conocer nuestra gama de productos.<br/> 
                     - <strong>Cómo realizar un pedido:</strong> Para obtener instrucciones sobre cómo comprar.<br/> 
                     - <strong>Métodos de pago:</strong> Para conocer los métodos de pago aceptados.<br/> 
                     - <strong>Tallas y guía de tallas:</strong> Para obtener información sobre tallas de productos.<br/> 
                     - <strong>Necesito información sobre el stock:</strong> Para verificar la disponibilidad de un producto específico.<br/> 
                     - <strong>Necesito la dirección del local:</strong> Para conocer nuestra dirección física.<br/> 
                     ¿En qué más puedo ayudarte?"
                       </div>
                       break
                       case "no":
                       case "No":
                        botResponse = "Me alegra haberte ayudado 🤖"
                        break
                            default:
                              botResponse = 
                              <div>
               Lo siento, no entiendo esa opción. Aquí hay algunas opciones que podrías probar <br/>
              - <strong>Teléfono: </strong> Para obtener nuestro número de teléfono <br/> 
              - <strong>Envíos:</strong> Para información sobre envíos y entrega. <br/> 
              - <strong>Productos disponibles:</strong> Para conocer nuestra gama de productos.<br/> 
              - <strong>Cómo realizar un pedido:</strong> Para obtener instrucciones sobre cómo comprar.<br/> 
              - <strong>Métodos de pago:</strong> Para conocer los métodos de pago aceptados.<br/> 
              - <strong>Tallas y guía de tallas:</strong> Para obtener información sobre tallas de productos.<br/> 
              - <strong>Necesito información sobre el stock:</strong> Para verificar la disponibilidad de un producto específico.<br/> 
              - <strong>Necesito la dirección del local:</strong> Para conocer nuestra dirección física.<br/> 
              ¿En qué más puedo ayudarte?"
                </div>
              break;
            }
            let  userResponse = inputText
            let array = [{text:userResponse, isUser: true}, {text:botResponse, isUser:false} ]
            const botMessage = addMessage(array)
            setInputText("");
          }
        };

        const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserMessage(inputText);
    }
    
  };
  
  return (
    <div className='chat-bot-container'>
      <Box 
        sx={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderColor: "#ba338a",
          marginTop: "25vh"
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 800,
            p: 2,
            border: "1px inset #ccc",
            borderRadius: 5,
            marginBottom:"10vh",
            borderColor: "#ba338a",
          }}
        >
          <div className="div-render-chat"
            ref={chatContainerRef}
            style={{ height: "500px", overflowY: "auto", marginBottom: "10px" }}
          >
            <div claaName="chat-messages" ref={chatContainerRef}>

            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: message.isUser ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                  textAlign: message.isUser ? "right" : "left",
                  // marginBottom: "10px",
                  // color: message.isUser ? "#ba338a" : "rgb(135 8 98)",
                }}
                >
                  {!message.isUser ? ( // Verifica si es un mensaje del bot
      <div>
        <Avatar 
          alt="Bot" 
          src="https://cdn.pixabay.com/photo/2015/06/12/18/31/cute-807306_1280.png"
        />
      </div>
    ) : null}

    <div className={message.isUser ? "user-message" : "bot-message"}>
      {message.text}
    </div>

    {message.isUser ? ( // Verifica si es un mensaje del usuario
      <div>
        <Avatar 
          alt="User"
          src={user ? user.image : ""}
        />
      </div>
    ) : null}
              </div>
            ))}
            </div>
          </div>

          
          <div className="input-conta">
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ba338a',
                },
                '&:hover fieldset': {
                  borderColor: '#ba338a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ba338a',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px", backgroundColor: "#ba338a" }}
            onClick={() => handleUserMessage(inputText)}
          >
            Enviar
          </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ChatBot;