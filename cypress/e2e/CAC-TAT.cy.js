describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('[id="firstName"]').as('firstName').should('be.enabled');
    cy.get('@firstName').type('John', { delay: 0 });
    cy.get('[id="lastName"]').as('lastName').should('be.enabled');
    cy.get('@lastName').type("Doe", { delay: 0 });
    cy.get('[id="email"]').as('email').should('be.enabled');
    cy.get('@email').type('john.doe@gmail.com', { delay: 0 });
    cy.get('[id="open-text-area"]').as('howCanWeHelpYou').should('be.enabled');
    cy.get('@howCanWeHelpYou').type('Help to test it.', { delay: 0 });
    cy.clock()
    cy.contains('button', 'Enviar').as('send').should('be.enabled');
    cy.get('@send').click();
    cy.get('[class="success"] > strong').as('successMessage');
    cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[id="firstName"]').as('firstName').should('be.enabled');
    cy.get('@firstName').type('John', { delay: 0 });
    cy.get('[id="lastName"]').as('lastName').should('be.enabled');
    cy.get('@lastName').type("Doe", { delay: 0 });
    cy.get('[id="email"]').as('email').should('be.enabled');
    cy.get('@email').type('john.doegmail.com', { delay: 0 });
    cy.get('[id="open-text-area"]').as('howCanWeHelpYou').should('be.enabled');
    cy.get('@howCanWeHelpYou').type('Help to test it.', { delay: 0 });
    cy.clock();
    cy.contains('button', 'Enviar').as('send').should('be.enabled');
    cy.get('@send').click();
    cy.get('[class="error"] > strong').as('errorMessage');
    cy.get('@errorMessage').should('have.text', 'Valide os campos obrigatórios!');
    cy.tick(3000);
    cy.get('@errorMessage').should('not.be.visible');
  })

  it('exibe campo telefone vazio após digitação de letras', () => {
    const phone_text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    cy.get('[id=phone]').type(phone_text, { delay: 0 });
    cy.get('[id=phone]').should('be.empty');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[id="firstName"]').as('firstName').should('be.enabled');
    cy.get('@firstName').type('John', { delay: 0 });
    cy.get('[id="lastName"]').as('lastName').should('be.enabled');
    cy.get('@lastName').type("Doe", { delay: 0 });
    cy.get('[id="email"]').as('email').should('be.enabled');
    cy.get('@email').type('john.doe@gmail.com', { delay: 0 });
    const preferencial_contact = 'phone'
    cy.get('[type="checkbox"][name="' + preferencial_contact + '"]').check();
    cy.get('[id="open-text-area"]').as('howCanWeHelpYou').should('be.enabled');
    cy.get('@howCanWeHelpYou').type('Help to test it.', { delay: 0 });
    cy.clock();
    cy.contains('button', 'Enviar').as('send').should('be.enabled');
    cy.get('@send').click();
    cy.get('[class="error"] > strong').as('errorMessage');
    cy.get('@errorMessage').should('have.text', 'Valide os campos obrigatórios!');
    cy.tick(3000);
    cy.get('@errorMessage').should('not.be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[id="firstName"]').as('firstName').should('be.enabled');
    cy.get('@firstName').type('John', { delay: 0 });
    cy.get('@firstName').should('have.value', 'John');
    cy.get('[id="lastName"]').as('lastName').should('be.enabled');
    cy.get('@lastName').type("Doe", { delay: 0 });
    cy.get('@lastName').should('have.value', 'Doe');
    cy.get('[id="email"]').as('email').should('be.enabled');
    cy.get('@email').type('john.doe@gmail.com', { delay: 0 });
    cy.get('@email').should('have.value', 'john.doe@gmail.com');
    cy.get('[id=phone]').as('phone').type('987654321', { delay: 0 });
    cy.get('@phone').should('have.value', '987654321');
    cy.get('@firstName').clear().should('have.value', '');
    cy.get('@lastName').clear().should('have.value', '');
    cy.get('@email').clear().should('have.value', '');
    cy.get('@phone').clear().should('have.value', '');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock();
    cy.contains('button', 'Enviar').as('send').should('be.enabled');
    cy.get('@send').click();
    cy.get('[class="error"] > strong').as('errorMessage');
    cy.get('@errorMessage').should('have.text', 'Valide os campos obrigatórios!');
    cy.tick(3000);
    cy.get('@errorMessage').should('not.be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const mandatoryFields = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      howCanIHelpYou: 'Please, I need to test it.'
    }
    cy.fillMandatoryFieldsAndSubmit(mandatoryFields)
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube');
    cy.get('#product').should('have.value', 'youtube');
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('Mentoria');
    cy.get('#product').should('have.value', 'mentoria');
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.contains('label', 'Feedback').children().check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('label > input').each(el => {
      cy.wrap(el).check().should('be.checked');
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked');
    cy.get('input[type="checkbox"]').last().uncheck()
      .should('not.be.checked');
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      });
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      });
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('example');
    cy.get('#file-upload').selectFile('@example')
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      });
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('src/privacy.html');
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    cy.get('h1').should('have.text', 'CAC TAT - Política de Privacidade');
    cy.get('p').should('be.visible').and('not.be.empty');
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success').should('not.be.visible')
      .invoke('show').should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide').should('not.be.visible');
    cy.get('.error').should('not.be.visible')
      .invoke('show').should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide').should('not.be.visible');
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer').should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).contains('CAC TAT')
    })
  })

  it('exibe o gato oculto na tela CAC TAT', () => {
    cy.get('#cat').should('not.be.visible').invoke('show').should('be.visible').and('have.text', '🐈');
  })
})