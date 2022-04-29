import { expect } from 'chai';
import { getInitials } from '../../../../util/getInitials';

describe('getInitials', () => {
  describe('empty or null string', () => {
    it('initials: return undefined if string is undefined', () => {
      expect(getInitials(undefined)).to.be.equal('0', 'should have returned 0');
    });

    it('initials: return undefined if string is empty', () => {
      expect(getInitials('')).to.be.equal('0', 'should have returned 0');
    });

    it('initials: return undefined if string is null', () => {
      expect(getInitials(null as any)).to.be.equal('0', 'should have returned 0');
    });
  });

  describe('name is a pubkey', () => {
    it('initials: return the first char after 05 if it starts with 05 and has length >2 ', () => {
      expect(getInitials('052')).to.be.equal('2', 'should have returned 2');
    });

    it('initials: return the first char after 05 if it starts with 05 and has length >2 ', () => {
      expect(getInitials('05bcd')).to.be.equal('b', 'should have returned b');
    });

    it('initials: return the first char after 05 if it starts with 05 and has length >2 ', () => {
      expect(getInitials('059052052052052052052052')).to.be.equal('9', 'should have returned 9');
    });
  });

  describe('name has a space in its content', () => {
    it('initials: return the first char of each of the first 3 words if a space is present ', () => {
      expect(getInitials('Henk Jan Boer')).to.be.equal('HJB', 'should have returned HJB');
    });

    it('initials: return the first char of each of the first 3 words if a space is present ', () => {
      expect(getInitials('Jan de Vos')).to.be.equal('JdV', 'should have returned JdV');
    });

    it('initials: return the first char of each of the first 3 words if a space is present, even with more than 3 words ', () => {
      expect(getInitials('Henk Jan Boer Jorritsma')).to.be.equal('HJB', 'should have returned JdV');
    });

    it('initials: return the first char of each of the first 3 words if a space is present, even with more than 3 words ', () => {
      expect(getInitials('Jan de Vos Brink')).to.be.equal('JdV', 'should have returned JD capitalized');
    });

  });

  describe('name has a - in its content', () => {
    it('initials: return the first char of each of the first 2 words if a - is present ', () => {
      expect(getInitials('John-Doe')).to.be.equal('JD', 'should have returned JD');
    });

    it('initials: return the first char of each of the first 2 words if a - is present ', () => {
      expect(getInitials('John-doe')).to.be.equal('Jd', 'should have returned Jd');
    });

    it('initials: return the first char capitalized of each of the first 3 words if a - is present, even with more than 3 words ', () => {
      expect(getInitials('John-Doe-Alice-Bob')).to.be.equal('JDA', 'should have returned JDA');
    });

    it('initials: return the first char capitalized of each of the first 3 words if a - is present, even with more than 3 words ', () => {
      expect(getInitials('John-doe-Alice-bob')).to.be.equal('JdA', 'should have returned JdA');
    });

  });

  describe('name has NO spaces in its content', () => {
    it('initials: return the first 3 chars of the first word if the name has no space ', () => {
      expect(getInitials('JOHNY')).to.be.equal('JOH', 'should have returned JOH');
    });

    it('initials: return the first 3 chars of the first word if the name has no space ', () => {
      expect(getInitials('Johnny')).to.be.equal('Joh', 'should have returned Joh');
    });

  });
});
