import React from 'react'
import { Grid, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
// import useHome from '../hooks/useHome'

const Home = () => {
  const navigate = useNavigate();
  // const { data, httpConfig, loading, error } = useHome(url)

  return (
    <div>

      <main>
        <Box className="overflow-hidden p-3 p-md-5  text-center "
          sx={{
            backgroundSize: "125% auto",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "center",
            backgroundImage: "linear-gradient(rgba(117, 117, 117, 0.5), rgba(64, 97, 94, 0.5)), url('/Images/lp1.png')"
          }}
        >
          <div className="col-md-6 p-lg-5 mx-auto my-5">
            <h1 className="display-3 fw-bold text-light">Sua jornada gamer começa aqui!</h1>
          </div>
        </Box>

        <div className="text-primary me-md-3 pt-3 px-3 pd-md-5 px-md-5 text-center overflow-hidden">
          <p></p>
          <h4>Hardware é mais do que apenas tecnologia, é uma paixão que nos conecta com o mundo digital.</h4>
          <h5>E para viver essa experiência de forma completa, você precisa dos componentes certos.
            Na EletrolUCS, oferecemos uma ampla variedade de peças para entusiastas de todos os níveis,
            desde o iniciante até o montador experiente.
          </h5>
        </div>
        {/* <hr style="border-color: transparent;" /> */}
        <h1 className="fw-normal text-muted mb-3 display-3">Descubra a emoção de cada gameplay.</h1>
        {/* <hr style="border-color: transparent;" /> */}

        <div data-aos="fade-right" className="d-md-flex flex-md-equal w-100 my-md-3">
          <div className="d-flex align-items-center bg-secondary text-light me-md-3 pt-3 px-3 pd-md-5 px-md-5 text-center overflow-hidden"
            data-aos="fade-right">
            <div className="my-3 py-3">
              <h2 className="display-5">Por que escolher a EletrolUCS?</h2>
            </div>
          </div>
          <div className="pt-3 px-3 pd-md-5 px-md-5 text-start text-primary overflow-hidden" data-aos="fade-left">
            <ul>
              <li>
                <strong>Especialistas em Hardware:</strong> Nossa equipe é formada por entusiastas de tecnologia que conhecem profundamente o mercado e podem te ajudar a escolher os componentes ideais para o seu PC, seja para games, trabalho ou uso geral.
              </li>
              <li>
                <strong>Marcas Renomadas:</strong> Trabalhamos com as melhores marcas de hardware do mercado, garantindo a qualidade e durabilidade dos nossos produtos, como processadores, placas de vídeo e memórias RAM.
              </li>
              <li>
                <strong>Variedade de Componentes:</strong> Processadores, placas-mãe, placas de vídeo, memórias RAM, SSDs, HDs, fontes de alimentação, gabinetes, coolers e muito mais. Tudo o que você precisa para montar ou atualizar seu computador.
              </li>
              <li>
                <strong>Atendimento Personalizado:</strong> Conte com nosso suporte para tirar todas as suas dúvidas e encontrar as melhores soluções para as suas necessidades de hardware.
              </li>
            </ul>
          </div>
        </div>

        <div className="d-md-flex flex-md-equal w-100 my-md-5">
          <div className="me-md-3 p-3 px-md-5 text-center overflow-hidden " data-aos="zoom-in-down">
            <img src="/Images/lp3_transparente.png" className="img-fluid rounded" alt="Diversão com família e amigos" />
          </div>
          <div className="d-flex align-items-center bg-danger pt-3 px-3 pt-md-5 px-md-5 text-center text-secondary overflow-hidden"
            data-aos="zoom-in-up">
            <div>
              <div className="my-1 py-1 text-light">
                <h2 className="display-5">Montar seu novo computador nunca foi tão emocionante</h2>
              </div>
              <div className="pt-3 px-3 pd-md-5 px-md-5 text-start text-light overflow-hidden">
                Se você busca adrenalina e desafios, a EletrolUCS é o seu lugar.
                <br />
                Aqui você encontra equipamentos de alta performance para o seu game, como monitores, teclados e processadoras de última geração.
                <br />Prepare-se para a luta contra os oponentes mais
                fortes e conquiste recordes incríveis!
              </div>
            </div>
          </div>
        </div>

        <div className="d-md-flex flex-md-equal w-100 my-md-3">
          <div className="overflow-hidden" data-aos="zoom-in">
            <img src="/Images/lp4.png" className="img-fluid rounded" alt="Diversão com família e amigos" />
          </div>
        </div>

        <div data-aos="fade-right" data-aos-delay="10" className=" w-100 my-md-3">
          <div data-aos="zoom-out" className="bg-info pt-3 px-3 pt-md-5 text-center text-secondary overflow-hidden">
            <div className="py-3 pd-md-5 text-center text-secondary overflow-hidden w-100">
              <div className="my-1 py-1">
                <h2 className="display-6">Ofertas imperdíveis!</h2>
              </div>

              Entre na nossa loja e veja dezenas de produtos disponíveis!
              <p></p>
              <Button type="button" variant="contained" onClick={() => navigate("/products")} className="btn btn-secondary">Acessar a loja</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home