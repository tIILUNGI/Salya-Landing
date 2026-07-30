import React, { useEffect } from 'react';

interface TermsAndPrivacyProps {
  onBack: () => void;
}

const TermsAndPrivacy: React.FC<TermsAndPrivacyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-app selection:bg-primary/10 selection:text-primary">
      {/* Logotipo como marca d'água no fundo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <img src="/logo.png" alt="Salya Logo" className="h-80 w-auto opacity-10" />
      </div>

      <header className="border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Voltar para o Início
          </button>
          <img src="/logo.png" alt="Salya Logo" className="h-8 w-auto" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">

          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Termos de Uso e Política de Privacidade
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              Se tiver dúvidas, fale connosco. A equipa do <strong>Salya</strong> encara seriamente
              a privacidade dos dados registados pelos seus utilizadores.
            </p>
          </section>

          <div className="bg-primary/5 border-l-4 border-primary pl-6 py-4 rounded-r-xl text-slate-600 dark:text-slate-400 leading-relaxed italic text-sm">
            A equipa do <strong>Salya</strong>, desenvolvido pela <strong>ILUNGI</strong>, assegura
            aos seus utilizadores privacidade e segurança relativamente aos dados facultados para os
            vários serviços disponibilizados. São recolhidos apenas os dados estritamente necessários
            para a prestação do serviço, de acordo com as indicações explícitas no site e as opções
            de cada utilizador.
          </div>

          <div className="grid gap-10">

            {/* 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">1</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Aceitação dos Termos</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Estes termos contêm as condições de utilização da plataforma desenvolvida pela{' '}
                <strong>ILUNGI</strong>, que oferece aos seus clientes sistemas de gestão de
                colaboradores e processamento de folha de pagamento através do{' '}
                <strong>Salya</strong>. Estes termos são válidos para todas as informações inseridas
                ou associadas aos serviços oferecidos. A aceitação dos termos é indispensável para
                a utilização do site e dos serviços da plataforma. A utilização do{' '}
                <strong>Salya</strong> implica a aceitação total destes termos.
              </p>
            </section>

            {/* 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">2</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Serviços</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Os serviços são prestados por meio do software disponível em{' '}
                <strong>salya.ao</strong>. O <strong>Salya</strong> oferece um serviço online de
                gestão de colaboradores, processamento de folha de pagamento com cálculos
                automatizados de <strong>IRT</strong> e <strong>INSS</strong>, e emissão de{' '}
                recibos profissionais em PDF. O <strong>Salya</strong> é um software pago —
                exceptuando o Plano Demo —, disponível nas modalidades doméstica, profissional e corporativa.
              </p>
            </section>

            {/* 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">3</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Cadastro</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Para o registo e a utilização dos serviços, o utilizador deverá efectuar um cadastro
                prévio, fornecendo voluntariamente informações sobre si e sobre a sua entidade. O
                titular e administrador da conta são definidos no momento do registo. A conta é
                pessoal e intransmissível, podendo ser acedida exclusivamente através do login e da
                palavra-passe criados pelo próprio utilizador. Este é o único e exclusivo responsável
                pela confidencialidade das suas credenciais de acesso.
              </p>
            </section>

            {/* 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">4</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dados Processados</h2>
              </div>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14 space-y-4">
                <p>
                  Para garantir a eficiência dos nossos serviços, o <strong>Salya</strong> recolhe
                  dados pessoais e profissionais, que são processados de forma automática ou
                  fornecidos directamente pelos utilizadores:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
                  {[
                    'Nome do Utilizador',
                    'Denominação Fiscal e NIF',
                    'Endereço de E-mail',
                    'Número de Telemóvel / Telefone',
                    'Morada',
                    'Dados de Colaboradores (para folha de pagamento)',

                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800"
                    >
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">5</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Finalidade do Tratamento dos Dados</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Recolhemos informações com o objectivo de prestar um serviço de qualidade, que inclui
                a realização de cálculos automáticos de impostos em conformidade com as tabelas
                oficiais da <strong>AGT</strong>, a emissão de recibos de vencimento e a geração de
                relatórios de gestão. Utilizamos ainda os seus dados para monitorizar o correcto
                funcionamento do software, resolver problemas técnicos comunicados e efectuar
                melhorias contínuas. O endereço de e-mail é utilizado para comunicação directa com
                o utilizador, incluindo avisos importantes sobre a sua conta.
              </p>
            </section>

            {/* 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">6</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Situações em que os Dados podem ser Partilhados</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14 mb-3">
                Não partilhamos informações pessoais com empresas, entidades ou indivíduos externos
                à <strong>ILUNGI</strong>, excepto nas seguintes situações:
              </p>
              <ul className="pl-14 space-y-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">Com o consentimento do utilizador:</strong>{' '}
                  Partilhamos informações pessoais apenas quando temos a sua autorização explícita
                  para o efeito.
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">Para processamento externo:</strong>{' '}
                  Podemos partilhar dados com afiliados ou prestadores de serviços de confiança,
                  com base nas nossas instruções e em conformidade com a nossa política de
                  privacidade e segurança.
                </li>
                <li>
                  <strong className="text-slate-700 dark:text-slate-300">Por motivos legais:</strong>{' '}
                  Partilharemos dados fora da <strong>ILUNGI</strong> quando tal for razoavelmente
                  necessário para cumprir a lei ou regulamento aplicável, ou para proteger os
                  direitos e a segurança do <strong>Salya</strong> e dos seus utilizadores.
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">7</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Responsabilidade da ILUNGI</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Em caso de falhas na plataforma ou dificuldades de acesso, o suporte do{' '}
                <strong>Salya</strong> deverá ser contactado, excepto durante feriados nacionais e
                fins de semana. A <strong>ILUNGI</strong> disponibiliza ainda suporte básico ao
                utilizador, que inclui o esclarecimento de dúvidas relativas ao uso da plataforma e
                a resolução de dificuldades técnicas.
              </p>
            </section>

            {/* 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">8</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Responsabilidade do Utilizador</h2>
              </div>
              <ul className="pl-14 space-y-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed list-none">
                {[
                  'Utilizar a plataforma de forma adequada e diligente, em conformidade com os presentes termos de uso, com a lei angolana, a moral e a ordem pública.',
                  'Manter o ambiente dos seus dispositivos de acesso seguro, recorrendo a ferramentas adequadas, tais como antivírus e firewall, de modo a prevenir riscos electrónicos.',
                  'Não explorar maliciosamente a segurança do software para a prática de actos ilícitos ou que possam danificar, inutilizar ou deteriorar a plataforma.',
                  'Garantir a veracidade, qualidade, integridade e legalidade de todos os dados introduzidos no sistema.',
                  'Notificar o Salya imediatamente em caso de qualquer acesso não autorizado à sua conta.',
                  'Verificar se o conteúdo de cada ficheiro inserido corresponde ao que nele é anunciado.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="pl-14 text-sm text-slate-500 dark:text-slate-500 italic">
                O utilizador declara e garante que todos os conteúdos inseridos não violam a
                legislação angolana, os presentes termos nem quaisquer outras normas aplicáveis.
              </p>
            </section>

            {/* 9 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">9</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Propriedade Intelectual</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Com sujeição a estes termos, a <strong>ILUNGI</strong> concede ao utilizador uma
                licença limitada, temporária, não exclusiva e intransmissível para utilizar o
                software exclusivamente no âmbito das obrigações e direitos aqui previstos. Todos
                os direitos relativos ao software, às suas funcionalidades e aos conteúdos
                associados — incluindo textos, imagens, gráficos e layouts — são de titularidade
                exclusiva da <strong>ILUNGI</strong> e encontram-se protegidos pela lei aplicável.
              </p>
            </section>

            {/* 10 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">10</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Alterações</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Por se tratar de um software sujeito a actualizações contínuas, os presentes termos
                podem ser alterados a qualquer momento, a exclusivo critério da{' '}
                <strong>ILUNGI</strong>, de forma a reflectir os ajustes realizados na plataforma.
                Sempre que ocorrer uma actualização, será enviado um e-mail ao utilizador a indicar
                a data de entrada em vigor das novas disposições, sendo solicitada nova aceitação
                das mesmas.
              </p>
            </section>

            {/* 11 */}
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary flex-shrink-0">11</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Outras Disposições</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-14">
                Os presentes termos de uso não criam qualquer vínculo laboral ou societário entre o
                utilizador e a <strong>ILUNGI</strong>, que permanece uma entidade independente e
                autónoma. Estes termos são regidos pelas leis da República de Angola. Quaisquer
                dúvidas e situações não previstas serão resolvidas, em primeira instância, pela{' '}
                <strong>ILUNGI</strong>.
              </p>
            </section>

          </div>
        </div>
      </main>

    </div>
  );
};

export default TermsAndPrivacy;
